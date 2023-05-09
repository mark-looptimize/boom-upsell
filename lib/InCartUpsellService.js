var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _InCartUpsellService_instances, _InCartUpsellService_dataRepository, _InCartUpsellService_upsellStrategy, _InCartUpsellService_upsellProduct, _InCartUpsellService_eligibleForTest, _InCartUpsellService_isUserEligibleForTest, _InCartUpsellService_checkForDealbreakers, _InCartUpsellService_onTestEligibility, _InCartUpsellService_initializeUpsellStrategy, _InCartUpsellService_getDataRepository, _InCartUpsellService_implementControlExperience, _InCartUpsellService_implementVariantExperience;
import { UpsellOfferInstaller } from "./UpsellOfferInstaller.js";
import { LocalStorageDataRepository } from "./repository/LocalStorageDataRepository.js";
import { BlendedUpsellStrategy } from "./strategies/BlendedUpsellStrategy.js";
export var UpsellStrategyOption;
(function (UpsellStrategyOption) {
    UpsellStrategyOption[UpsellStrategyOption["BLENDED"] = 0] = "BLENDED";
    UpsellStrategyOption[UpsellStrategyOption["DEFAULT"] = 1] = "DEFAULT";
})(UpsellStrategyOption || (UpsellStrategyOption = {}));
;
export var DataSource;
(function (DataSource) {
    DataSource[DataSource["TEST"] = 0] = "TEST";
    DataSource[DataSource["LOCAL_STORAGE"] = 1] = "LOCAL_STORAGE";
})(DataSource || (DataSource = {}));
;
export class InCartUpsellService {
    constructor(config) {
        _InCartUpsellService_instances.add(this);
        _InCartUpsellService_dataRepository.set(this, void 0);
        _InCartUpsellService_upsellStrategy.set(this, void 0);
        _InCartUpsellService_upsellProduct.set(this, void 0);
        _InCartUpsellService_eligibleForTest.set(this, void 0);
        __classPrivateFieldSet(this, _InCartUpsellService_dataRepository, __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_getDataRepository).call(this, config.dataSource), "f");
        __classPrivateFieldSet(this, _InCartUpsellService_upsellStrategy, __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_initializeUpsellStrategy).call(this, config.upsellStrategy, __classPrivateFieldGet(this, _InCartUpsellService_dataRepository, "f")), "f");
        __classPrivateFieldSet(this, _InCartUpsellService_eligibleForTest, __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_isUserEligibleForTest).call(this), "f");
        if (__classPrivateFieldGet(this, _InCartUpsellService_eligibleForTest, "f")) {
            __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_onTestEligibility).call(this);
        }
    }
    /**
     * Registers a page view for a given item
     */
    registerProductView() {
        if (window.item === undefined || window.item === null) {
            return;
        }
        else {
            const item = window.item;
            __classPrivateFieldGet(this, _InCartUpsellService_dataRepository, "f").registerItemView(item);
        }
    }
}
_InCartUpsellService_dataRepository = new WeakMap(), _InCartUpsellService_upsellStrategy = new WeakMap(), _InCartUpsellService_upsellProduct = new WeakMap(), _InCartUpsellService_eligibleForTest = new WeakMap(), _InCartUpsellService_instances = new WeakSet(), _InCartUpsellService_isUserEligibleForTest = function _InCartUpsellService_isUserEligibleForTest() {
    try {
        __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_checkForDealbreakers).call(this);
        __classPrivateFieldSet(this, _InCartUpsellService_upsellProduct, __classPrivateFieldGet(this, _InCartUpsellService_upsellStrategy, "f").findBestOffer(), "f");
        // The user is eligible for the test!
        // Only now should we figure out if we should show A or B not before.
        return true;
    }
    catch (error) {
        window.dataLayer?.push({
            "event": "exception",
            "details": error.message
        });
        return false;
    }
}, _InCartUpsellService_checkForDealbreakers = function _InCartUpsellService_checkForDealbreakers() {
    const supportsCustomElements = ('customElements' in window);
    if (!supportsCustomElements) {
        throw new Error("Browser does not support Custom Elements");
    }
}, _InCartUpsellService_onTestEligibility = function _InCartUpsellService_onTestEligibility() {
    // Step 1: Quick safety check
    if (__classPrivateFieldGet(this, _InCartUpsellService_upsellProduct, "f") === undefined) {
        throw new Error("Upsell Product is not defined");
    }
    // Step 2: Install an event listener
    window.addEventListener('upsell_test_control', __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_implementControlExperience));
    window.addEventListener('upsell_variant_group', __classPrivateFieldGet(this, _InCartUpsellService_instances, "m", _InCartUpsellService_implementVariantExperience));
    // Step 3: Communicate test eligibility with the testing tool via custom event
    window.dataLayer?.push({
        "event": "in_cart_upsell_test_trigger"
    });
}, _InCartUpsellService_initializeUpsellStrategy = function _InCartUpsellService_initializeUpsellStrategy(option, dataSource) {
    switch (option) {
        case UpsellStrategyOption.BLENDED:
            return new BlendedUpsellStrategy(dataSource);
        default:
            throw new Error("Invalid Upsell Strategy option");
    }
}, _InCartUpsellService_getDataRepository = function _InCartUpsellService_getDataRepository(option) {
    switch (option) {
        case DataSource.LOCAL_STORAGE:
            return new LocalStorageDataRepository();
        default:
            throw new Error("Invalid Data Source option");
    }
}, _InCartUpsellService_implementControlExperience = function _InCartUpsellService_implementControlExperience() {
    window.dataLayer?.push({
        "event": "upsell_default_experience"
    });
}, _InCartUpsellService_implementVariantExperience = function _InCartUpsellService_implementVariantExperience() {
    window.dataLayer?.push({
        "event": "upsell_variant_experience"
    });
    // Disable the default experience
    window.OCUIncart = null;
    new UpsellOfferInstaller(__classPrivateFieldGet(this, _InCartUpsellService_upsellProduct, "f"));
};
//# sourceMappingURL=InCartUpsellService.js.map