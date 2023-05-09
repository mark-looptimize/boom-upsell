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
var _LocalStorageDataRepository_instances, _LocalStorageDataRepository_productViews, _LocalStorageDataRepository_persistData, _LocalStorageDataRepository_fetchDataFromLocalStorage;
const localStorageKey = 'looptimize_icu';
export class LocalStorageDataRepository {
    constructor() {
        _LocalStorageDataRepository_instances.add(this);
        _LocalStorageDataRepository_productViews.set(this, void 0);
        __classPrivateFieldSet(this, _LocalStorageDataRepository_productViews, __classPrivateFieldGet(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_fetchDataFromLocalStorage).call(this), "f");
    }
    registerItemView(item) {
        const productId = item.ProductID;
        if (__classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f").has(productId)) {
            // Increment the view count
            const productViewData = __classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f").get(productId);
            productViewData.views++;
            __classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f").set(productId, productViewData);
        }
        else {
            __classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f").set(productId, {
                product: item,
                views: 1
            });
        }
        __classPrivateFieldGet(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_persistData).call(this);
    }
    get itemsInCart() {
        if (window.OCUIncart.cart_items !== undefined) {
            const inCartItems = window.OCUIncart.cart_items;
            return inCartItems;
        }
        throw new Error("Unable to determine in cart items");
    }
    get productsViewed() {
        __classPrivateFieldSet(this, _LocalStorageDataRepository_productViews, __classPrivateFieldGet(this, _LocalStorageDataRepository_instances, "m", _LocalStorageDataRepository_fetchDataFromLocalStorage).call(this), "f");
        return __classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f");
    }
}
_LocalStorageDataRepository_productViews = new WeakMap(), _LocalStorageDataRepository_instances = new WeakSet(), _LocalStorageDataRepository_persistData = function _LocalStorageDataRepository_persistData() {
    const serializedData = JSON.stringify(__classPrivateFieldGet(this, _LocalStorageDataRepository_productViews, "f"));
    window.localStorage.setItem(localStorageKey, serializedData);
}, _LocalStorageDataRepository_fetchDataFromLocalStorage = function _LocalStorageDataRepository_fetchDataFromLocalStorage() {
    const localStorageData = window.localStorage.getItem(localStorageKey);
    if (localStorageData === null) {
        return new Map();
    }
    else {
        const deserializedData = JSON.parse(localStorageData);
        return deserializedData;
    }
};
//# sourceMappingURL=LocalStorageDataRepository.js.map