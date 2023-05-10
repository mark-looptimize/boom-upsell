import { ServiceLogger } from "./Logger.js";
import { UpsellOfferInstaller } from "./UpsellOfferInstaller.js";
import { DataRepository, Item } from "../repository/DataRepositoryInterface.js";
import { LocalStorageDataRepository } from "../repository/LocalStorageDataRepository.js";
import { BlendedUpsellStrategy } from "../strategies/BlendedUpsellStrategy.js";
import { UpsellStrategy } from "../strategies/UpsellStrategyInterface.js";

export enum UpsellStrategyOption { BLENDED, DEFAULT };

export enum DataSource { TEST, LOCAL_STORAGE };

export interface FeatureConfiguration {
  debugMode?: boolean,
  dataSource: DataSource,
  upsellStrategy: UpsellStrategyOption,
};

export class InCartUpsellService {
  #config: FeatureConfiguration;

  #dataRepository: DataRepository;

  #upsellStrategy?: UpsellStrategy;

  #upsellProduct?: Item;

  #eligibleForTest: boolean = false;

  constructor(config: FeatureConfiguration) {
    if (config.debugMode === true) {
      ServiceLogger.debugMode = true;
      ServiceLogger.log("Debug Mode Enabled");
    }
    this.#config = config;
    this.#dataRepository = this.#getDataRepository(config.dataSource);
  }

  public get upsellProduct(): Item | undefined {
    return this.#upsellProduct;
  }

  /**
   * Registers a page view for a given item
   */
  public registerProductView(): void {
    if (window.item === undefined || window.item === null || typeof(window.ShopifyAnalytics.meta.product.variants[0].id) !== 'number' || window.ShopifyAnalytics.meta.product.variants.length !== 1) {
      ServiceLogger.error("Unable to fetch correct item details");
      return;
    } else {
      const item: Item = window.item;
      this.#dataRepository.registerItemView(item, window.ShopifyAnalytics.meta.product.variants[0].id);  
    }
  }

  /**
   * Checks if we should include the user in the test
   */
  public async checkTestEligibility(): Promise<void> {
    this.#upsellStrategy = this.#initializeUpsellStrategy(this.#config.upsellStrategy, this.#dataRepository);
    this.#eligibleForTest = await this.#isUserEligibleForTest();
    if (this.#eligibleForTest) {
      this.#onTestEligibility();
    }
  }

  async #isUserEligibleForTest(): Promise<boolean> {
    try {
      this.#upsellProduct = this.#upsellStrategy!.findBestOffer();
      await this.#checkForDealbreakers();
      // The user is eligible for the test!
      // Only now should we figure out if we should show A or B not before.
      return true;
    } catch (error: any) {
      ServiceLogger.error(error.message);
      return false;
    }
  }

  async #checkForDealbreakers(): Promise<void>{
    const supportsCustomElements = ('customElements' in window);
    if (!supportsCustomElements) {
      throw new Error("Browser does not support Custom Elements");
    }
    // Load the component here dynamically to reduce initial bundle size
    await import('../component/incart-upsell.js');
  }

  #onTestEligibility(): void {
    // Step 1: Quick safety check
    if (this.#upsellProduct === undefined) {
      throw new Error("Upsell Product is not defined");
    }

    // Step 2: Install an event listener
    this.#addOptimizeEventListeners();

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

  #implementControlExperience(): void {
    ServiceLogger.log("Implementing Default Experience");
    this.#removeOptimizeEventListeners();
  }

  #implementVariantExperience(): void {
    ServiceLogger.log("Implementing Variant Experience");
    this.#removeOptimizeEventListeners();
    // Disable the default experience
    window.OCUIncart = null;

    new UpsellOfferInstaller(this.#upsellProduct!);
  }

  #removeOptimizeEventListeners(): void {
    ServiceLogger.log("Removing experiment event listeners");
    window.removeEventListener('handleUpsellExperimentControl', this.#implementControlExperience);
    window.removeEventListener('handleUpsellExperimentVariant', this.#implementVariantExperience);
  }

  #addOptimizeEventListeners(): void {
    ServiceLogger.log("Installing experiment event listeners");
    window.addEventListener('handleUpsellExperimentControl', this.#implementControlExperience);
    window.addEventListener('handleUpsellExperimentVariant', this.#implementVariantExperience);
  }
}