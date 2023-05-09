// lib/UpsellOfferInstaller.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UpsellOfferInstaller_instances;
var _UpsellOfferInstaller_product;
var _UpsellOfferInstaller_installComponent;
var UpsellOfferInstaller = class {
  constructor(product) {
    _UpsellOfferInstaller_instances.add(this);
    _UpsellOfferInstaller_product.set(this, void 0);
    __classPrivateFieldSet(this, _UpsellOfferInstaller_product, product, "f");
    __classPrivateFieldGet(this, _UpsellOfferInstaller_instances, "m", _UpsellOfferInstaller_installComponent).call(this);
  }
};
_UpsellOfferInstaller_product = /* @__PURE__ */ new WeakMap(), _UpsellOfferInstaller_instances = /* @__PURE__ */ new WeakSet(), _UpsellOfferInstaller_installComponent = function _UpsellOfferInstaller_installComponent2() {
  console.log(__classPrivateFieldGet(this, _UpsellOfferInstaller_product, "f"));
};

// lib/repository/LocalStorageDataRepository.js
var __classPrivateFieldGet2 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet2 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _LocalStorageDataRepository_instances;
var _LocalStorageDataRepository_productViews;
var _LocalStorageDataRepository_persistData;
var _LocalStorageDataRepository_fetchDataFromLocalStorage;
var localStorageKey = "looptimize_icu";
var LocalStorageDataRepository = class {
  constructor() {
    _LocalStorageDataRepository_instances.add(this);
    _LocalStorageDataRepository_productViews.set(this, void 0);
    __classPrivateFieldSet2(this, _LocalStorageDataRepository_productViews, __classPrivateFieldGet2(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_fetchDataFromLocalStorage).call(this), "f");
  }
  registerItemView(item) {
    const productId = item.ProductID;
    if (__classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f").has(productId)) {
      const productViewData = __classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f").get(productId);
      productViewData.views++;
      __classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f").set(productId, productViewData);
    } else {
      __classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f").set(productId, {
        product: item,
        views: 1
      });
    }
    __classPrivateFieldGet2(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_persistData).call(this);
  }
  get itemsInCart() {
    if (window.OCUIncart.cart_items !== void 0) {
      const inCartItems = window.OCUIncart.cart_items;
      return inCartItems;
    }
    throw new Error("Unable to determine in cart items");
  }
  get productsViewed() {
    __classPrivateFieldSet2(this, _LocalStorageDataRepository_productViews, __classPrivateFieldGet2(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_fetchDataFromLocalStorage).call(this), "f");
    return __classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f");
  }
};
_LocalStorageDataRepository_productViews = /* @__PURE__ */ new WeakMap(), _LocalStorageDataRepository_instances = /* @__PURE__ */ new WeakSet(), _LocalStorageDataRepository_persistData = function _LocalStorageDataRepository_persistData2() {
  const serializedData = JSON.stringify(__classPrivateFieldGet2(this, _LocalStorageDataRepository_productViews, "f"));
  window.localStorage.setItem(localStorageKey, serializedData);
}, _LocalStorageDataRepository_fetchDataFromLocalStorage = function _LocalStorageDataRepository_fetchDataFromLocalStorage2() {
  const localStorageData = window.localStorage.getItem(localStorageKey);
  if (localStorageData === null) {
    return /* @__PURE__ */ new Map();
  } else {
    const deserializedData = JSON.parse(localStorageData);
    return deserializedData;
  }
};

// lib/strategies/BlendedUpsellStrategy.js
var __classPrivateFieldSet3 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet3 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlendedUpsellStrategy_instances;
var _BlendedUpsellStrategy_dataRepository;
var _BlendedUpsellStrategy_calculateUpsellScore;
var _BlendedUpsellStrategy_rankItems;
var _BlendedUpsellStrategy_compareProductViews;
var BlendedUpsellStrategy = class {
  constructor(dataRepository) {
    _BlendedUpsellStrategy_instances.add(this);
    _BlendedUpsellStrategy_dataRepository.set(this, void 0);
    __classPrivateFieldSet3(this, _BlendedUpsellStrategy_dataRepository, dataRepository, "f");
  }
  findBestOffer() {
    const itemsInCart = __classPrivateFieldGet3(this, _BlendedUpsellStrategy_dataRepository, "f").itemsInCart;
    const viewedItems = __classPrivateFieldGet3(this, _BlendedUpsellStrategy_dataRepository, "f").productsViewed;
    const rankedItems = __classPrivateFieldGet3(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_rankItems).call(this, viewedItems);
    let bestOffer;
    rankedItems.every((item) => {
      const productId = item.product.ProductID;
      const matchingItemInCart = itemsInCart.find((item2) => item2.product_id = productId);
      if (!matchingItemInCart) {
        bestOffer = item.product;
        return false;
      }
      return true;
    });
    if (bestOffer !== void 0) {
      return bestOffer;
    }
    throw new Error("No suitable upsell offer found");
  }
};
_BlendedUpsellStrategy_dataRepository = /* @__PURE__ */ new WeakMap(), _BlendedUpsellStrategy_instances = /* @__PURE__ */ new WeakSet(), _BlendedUpsellStrategy_calculateUpsellScore = function _BlendedUpsellStrategy_calculateUpsellScore2(itemViewData) {
  const productViewCount = itemViewData.views;
  const productPrice = parseFloat(itemViewData.product.Price.substring(1));
  const upsellScore = productViewCount * productPrice;
  return upsellScore;
}, _BlendedUpsellStrategy_rankItems = function _BlendedUpsellStrategy_rankItems2(productViews) {
  const scoredItemViews = [];
  productViews.forEach((item) => {
    const computedScore = __classPrivateFieldGet3(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_calculateUpsellScore).call(this, item);
    item.score = computedScore;
    scoredItemViews.push(item);
  });
  const sortedProductViews = scoredItemViews.sort(__classPrivateFieldGet3(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_compareProductViews)).reverse();
  return sortedProductViews;
}, _BlendedUpsellStrategy_compareProductViews = function _BlendedUpsellStrategy_compareProductViews2(a, b) {
  if (a.score === void 0 || b.score === void 0) {
    return 0;
  }
  if (a.score < b.score) {
    return -1;
  }
  if (a.score > b.score) {
    return 1;
  }
  return 0;
};

// lib/InCartUpsellService.js
var __classPrivateFieldGet4 = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet4 = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _InCartUpsellService_instances;
var _InCartUpsellService_dataRepository;
var _InCartUpsellService_upsellStrategy;
var _InCartUpsellService_upsellProduct;
var _InCartUpsellService_eligibleForTest;
var _InCartUpsellService_isUserEligibleForTest;
var _InCartUpsellService_checkForDealbreakers;
var _InCartUpsellService_onTestEligibility;
var _InCartUpsellService_initializeUpsellStrategy;
var _InCartUpsellService_getDataRepository;
var _InCartUpsellService_implementControlExperience;
var _InCartUpsellService_implementVariantExperience;
var UpsellStrategyOption;
(function(UpsellStrategyOption2) {
  UpsellStrategyOption2[UpsellStrategyOption2["BLENDED"] = 0] = "BLENDED";
  UpsellStrategyOption2[UpsellStrategyOption2["DEFAULT"] = 1] = "DEFAULT";
})(UpsellStrategyOption || (UpsellStrategyOption = {}));
var DataSource;
(function(DataSource2) {
  DataSource2[DataSource2["TEST"] = 0] = "TEST";
  DataSource2[DataSource2["LOCAL_STORAGE"] = 1] = "LOCAL_STORAGE";
})(DataSource || (DataSource = {}));
var InCartUpsellService = class {
  constructor(config) {
    _InCartUpsellService_instances.add(this);
    _InCartUpsellService_dataRepository.set(this, void 0);
    _InCartUpsellService_upsellStrategy.set(this, void 0);
    _InCartUpsellService_upsellProduct.set(this, void 0);
    _InCartUpsellService_eligibleForTest.set(this, void 0);
    __classPrivateFieldSet4(this, _InCartUpsellService_dataRepository, __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_getDataRepository).call(this, config.dataSource), "f");
    __classPrivateFieldSet4(this, _InCartUpsellService_upsellStrategy, __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_initializeUpsellStrategy).call(this, config.upsellStrategy, __classPrivateFieldGet4(this, _InCartUpsellService_dataRepository, "f")), "f");
    __classPrivateFieldSet4(this, _InCartUpsellService_eligibleForTest, __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_isUserEligibleForTest).call(this), "f");
    if (__classPrivateFieldGet4(this, _InCartUpsellService_eligibleForTest, "f")) {
      __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_onTestEligibility).call(this);
    }
  }
  /**
   * Registers a page view for a given item
   */
  registerProductView() {
    if (window.item === void 0 || window.item === null) {
      return;
    } else {
      const item = window.item;
      __classPrivateFieldGet4(this, _InCartUpsellService_dataRepository, "f").registerItemView(item);
    }
  }
};
_InCartUpsellService_dataRepository = /* @__PURE__ */ new WeakMap(), _InCartUpsellService_upsellStrategy = /* @__PURE__ */ new WeakMap(), _InCartUpsellService_upsellProduct = /* @__PURE__ */ new WeakMap(), _InCartUpsellService_eligibleForTest = /* @__PURE__ */ new WeakMap(), _InCartUpsellService_instances = /* @__PURE__ */ new WeakSet(), _InCartUpsellService_isUserEligibleForTest = function _InCartUpsellService_isUserEligibleForTest2() {
  try {
    __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_checkForDealbreakers).call(this);
    __classPrivateFieldSet4(this, _InCartUpsellService_upsellProduct, __classPrivateFieldGet4(this, _InCartUpsellService_upsellStrategy, "f").findBestOffer(), "f");
    return true;
  } catch (error) {
    window.dataLayer?.push({
      "event": "exception",
      "details": error.message
    });
    return false;
  }
}, _InCartUpsellService_checkForDealbreakers = function _InCartUpsellService_checkForDealbreakers2() {
  const supportsCustomElements = "customElements" in window;
  if (!supportsCustomElements) {
    throw new Error("Browser does not support Custom Elements");
  }
}, _InCartUpsellService_onTestEligibility = function _InCartUpsellService_onTestEligibility2() {
  if (__classPrivateFieldGet4(this, _InCartUpsellService_upsellProduct, "f") === void 0) {
    throw new Error("Upsell Product is not defined");
  }
  window.addEventListener("upsell_test_control", __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_implementControlExperience));
  window.addEventListener("upsell_variant_group", __classPrivateFieldGet4(this, _InCartUpsellService_instances, "m", _InCartUpsellService_implementVariantExperience));
  window.dataLayer?.push({
    "event": "in_cart_upsell_test_trigger"
  });
}, _InCartUpsellService_initializeUpsellStrategy = function _InCartUpsellService_initializeUpsellStrategy2(option, dataSource) {
  switch (option) {
    case UpsellStrategyOption.BLENDED:
      return new BlendedUpsellStrategy(dataSource);
    default:
      throw new Error("Invalid Upsell Strategy option");
  }
}, _InCartUpsellService_getDataRepository = function _InCartUpsellService_getDataRepository2(option) {
  switch (option) {
    case DataSource.LOCAL_STORAGE:
      return new LocalStorageDataRepository();
    default:
      throw new Error("Invalid Data Source option");
  }
}, _InCartUpsellService_implementControlExperience = function _InCartUpsellService_implementControlExperience2() {
  window.dataLayer?.push({
    "event": "upsell_default_experience"
  });
}, _InCartUpsellService_implementVariantExperience = function _InCartUpsellService_implementVariantExperience2() {
  window.dataLayer?.push({
    "event": "upsell_variant_experience"
  });
  window.OCUIncart = null;
  new UpsellOfferInstaller(__classPrivateFieldGet4(this, _InCartUpsellService_upsellProduct, "f"));
};

// lib/index.js
var inCartUpsellConfig = {
  dataSource: DataSource.LOCAL_STORAGE,
  upsellStrategy: UpsellStrategyOption.BLENDED
};
var inCartUpsell = new InCartUpsellService(inCartUpsellConfig);
//# sourceMappingURL=index.js.map
