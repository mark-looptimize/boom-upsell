import { UpsellOfferInstaller } from "./UpsellOfferInstaller.js";
import { DataRepository, Item } from "./repository/DataRepositoryInterface.js";
import { LocalStorageDataRepository } from "./repository/LocalStorageDataRepository.js";
import { BlendedUpsellStrategy } from "./strategies/BlendedUpsellStrategy.js";
import { UpsellStrategy } from "./strategies/UpsellStrategyInterface.js";

export enum UpsellStrategyOption { BLENDED, DEFAULT };

export enum DataSource { TEST, LOCAL_STORAGE };

export interface FeatureConfiguration {
  debugMode?: boolean,
  dataSource: DataSource,
  upsellStrategy: UpsellStrategyOption,
}

export class InCartUpsellService {
  #dataRepository: DataRepository

  #upsellStrategy: UpsellStrategy

  #upsellProduct?: Item

  #eligibleForTest: boolean;

  constructor(config: FeatureConfiguration) {
    this.#dataRepository = this.#getDataRepository(config.dataSource);
    this.#upsellStrategy = this.#initializeUpsellStrategy(config.upsellStrategy, this.#dataRepository);
    this.#eligibleForTest = this.#isUserEligibleForTest();
    if (this.#eligibleForTest) {
      this.#onTestEligibility();
    }
  }

  // Call this method only in the variant version. 
  static disableDefaultUpsellMethod(): void {
    window.OCUIncart = null;
  }

  /**
   * Registers a page view for a given item
   */
  public registerProductView() {
    if (window.item === undefined || window.item === null) {
      return;
    } else {
      const item: Item = window.item;
      this.#dataRepository.registerItemView(item);  
    }
  }

  #isUserEligibleForTest(): boolean {
    try {
      this.#checkForDealbreakers();
      this.#upsellProduct = this.#upsellStrategy.findBestOffer();
      // The user is eligible for the test!
      // Only now should we figure out if we should show A or B not before.
      return true;
    } catch (error: any) {
      window.dataLayer?.push({
        "event": "exception",
        "details": error.message
      });
      return false;
    }
  }

  #checkForDealbreakers(): void{
    const supportsCustomElements = ('customElements' in window)
    if (!supportsCustomElements) {
      throw new Error("Browser does not support Custom Elements");
    }
  }

  #onTestEligibility(): void {
    // Quick safety check
    if (this.#upsellProduct === undefined) {
      throw new Error("Upsell Product is not defined");
    }

    // Step 1: Communicate test eligibility with the testing tool via custom event
    window.dataLayer?.push({
      "event": "in_cart_upsell_test_trigger"
    });

    // Step 2: Add the offer to the page but hide it by default and use the testing tool 
    // to unhide it for those not in the control group.
    new UpsellOfferInstaller(this.#upsellProduct);
  }

  #initializeUpsellStrategy(option: UpsellStrategyOption, dataSource: DataRepository): UpsellStrategy{
    switch (option) {
      case UpsellStrategyOption.BLENDED:
        return new BlendedUpsellStrategy(dataSource);
      default:
        throw new Error("Invalid Upsell Strategy option");
    }
  }

  #getDataRepository(option: DataSource): DataRepository {
    switch (option) {
      case DataSource.LOCAL_STORAGE:
        return new LocalStorageDataRepository();
      default:
        throw new Error("Invalid Data Source option");
    }
  }
}