import { ServiceLogger } from "./Logger.js";
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
  #config: FeatureConfiguration;

  #dataRepository: DataRepository

  #upsellStrategy?: UpsellStrategy

  #upsellProduct?: Item

  #eligibleForTest: boolean = false;;

  constructor(config: FeatureConfiguration) {
    if (config.debugMode === true) {
      ServiceLogger.debugMode = true;
      ServiceLogger.log("Debug Mode Enabled");
    }
    this.#config = config;
    this.#dataRepository = this.#getDataRepository(config.dataSource);
  }

  /**
   * Registers a page view for a given item
   */
  public registerProductView(): void {
    if (window.item === undefined || window.item === null) {
      ServiceLogger.error("No Item found on the page");
      return;
    } else {
      const item: Item = window.item;
      this.#dataRepository.registerItemView(item);  
    }
  }

  /**
   * Checks if we should include the user in the test
   */
  public checkTestEligibility(): void {
    this.#upsellStrategy = this.#initializeUpsellStrategy(this.#config.upsellStrategy, this.#dataRepository);
    this.#eligibleForTest = this.#isUserEligibleForTest();
    if (this.#eligibleForTest) {
      this.#onTestEligibility();
    }
  }

  #isUserEligibleForTest(): boolean {
    try {
      this.#checkForDealbreakers();
      this.#upsellProduct = this.#upsellStrategy!.findBestOffer();
      // The user is eligible for the test!
      // Only now should we figure out if we should show A or B not before.
      return true;
    } catch (error: any) {
      ServiceLogger.error(error.message);
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
    // Step 1: Quick safety check
    if (this.#upsellProduct === undefined) {
      throw new Error("Upsell Product is not defined");
    }

    // Step 2: Install an event listener
    window.addEventListener('upsell_test_control', this.#implementControlExperience);
    window.addEventListener('upsell_variant_group', this.#implementVariantExperience);

    // Step 3: Communicate test eligibility with the testing tool via custom event
    window.dataLayer?.push({
      "event": "in_cart_upsell_test_trigger"
    });

    ServiceLogger.log("Eligible for Experiment");
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

  #implementControlExperience(){
    ServiceLogger.log("Implementing Default Experience");
  }

  #implementVariantExperience(){
    ServiceLogger.log("Implementing Variant Experience");

    // Disable the default experience
    window.OCUIncart = null;

    new UpsellOfferInstaller(this.#upsellProduct!);
  }
}