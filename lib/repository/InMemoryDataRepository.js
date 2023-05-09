var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _InMemoryDataRepository_productViews;
export class InMemoryDataRepository {
    constructor() {
        _InMemoryDataRepository_productViews.set(this, new Map());
    }
    registerItemView(item) {
        const productId = item.ProductID;
        if (__classPrivateFieldGet(this, _InMemoryDataRepository_productViews, "f").has(productId)) {
            // Increment the view count
            const productViewData = __classPrivateFieldGet(this, _InMemoryDataRepository_productViews, "f").get(productId);
            productViewData.views++;
            __classPrivateFieldGet(this, _InMemoryDataRepository_productViews, "f").set(productId, productViewData);
        }
        else {
            __classPrivateFieldGet(this, _InMemoryDataRepository_productViews, "f").set(productId, {
                product: item,
                views: 1
            });
        }
    }
    get itemsInCart() {
        const inCartItems = [{
                product_id: 6678277816433,
                quantity: 1,
                product_title: 'Boomstick Rose Nude',
                final_price: 2800
            }];
        return inCartItems;
    }
    get productsViewed() {
        return __classPrivateFieldGet(this, _InMemoryDataRepository_productViews, "f");
    }
}
_InMemoryDataRepository_productViews = new WeakMap();
//# sourceMappingURL=InMemoryDataRepository.js.map