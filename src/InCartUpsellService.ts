import { UpsellOfferInstaller } from "./UpsellOfferInstaller.js";
import { ProductInfo } from "./repository/DataRepositoryInterface.js";
import { UpsellStrategy } from "./strategies/UpsellStrategyInterface.js";

export interface FeatureConfiguration {
  enabled: boolean
  debugMode?: boolean
  upsellStrategy: UpsellStrategy
}

export class InCartUpsellService {
  #serviceConfiguration: FeatureConfiguration;

  #upsellProduct?: ProductInfo

  #eligibleForTest: boolean;

  constructor(config: FeatureConfiguration) {
    this.#serviceConfiguration = config;
    this.#eligibleForTest = this.#isUserEligibleForTest();
    if (this.#eligibleForTest) {
      this.#onTestEligibility();
    }
  }

  // Call this method only in the variant version. 
  static disableDefaultUpsellMethod(): void {
    window.OCUIncart = null;
  }

  #isUserEligibleForTest(): boolean {
    try {
      this.#checkForDealbreakers();
      this.#upsellProduct = this.#serviceConfiguration.upsellStrategy.findBestOffer();
      // The user is eligible for the test!
      // Only now should we figure out if we should show A or B not before.
      return true;
    } catch (error) {
      window.dataLayer?.push({
        "event": "exception",
        "details": error
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
}