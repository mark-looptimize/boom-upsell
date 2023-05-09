var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BlendedUpsellStrategy_instances, _BlendedUpsellStrategy_dataRepository, _BlendedUpsellStrategy_calculateUpsellScore, _BlendedUpsellStrategy_rankItems, _BlendedUpsellStrategy_compareProductViews;
/*
  Blended Strategy will determine the most apporpriate opportunity
  by multiplying the number of times a product was viewed with the price
  of the item to calculate an [upsellScore] that we can then use to
  rank our opportunities and find the most appropriate one.
*/
export class BlendedUpsellStrategy {
    constructor(dataRepository) {
        _BlendedUpsellStrategy_instances.add(this);
        _BlendedUpsellStrategy_dataRepository.set(this, void 0);
        __classPrivateFieldSet(this, _BlendedUpsellStrategy_dataRepository, dataRepository, "f");
    }
    findBestOffer() {
        const itemsInCart = __classPrivateFieldGet(this, _BlendedUpsellStrategy_dataRepository, "f").itemsInCart;
        const viewedItems = __classPrivateFieldGet(this, _BlendedUpsellStrategy_dataRepository, "f").productsViewed;
        const rankedItems = __classPrivateFieldGet(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_rankItems).call(this, viewedItems);
        let bestOffer;
        // Move through the ranked list of product views and check if that item
        // already exists in the cart and stop looking when we find a match
        // https://masteringjs.io/tutorials/fundamentals/foreach-break
        rankedItems.every(item => {
            const productId = item.product.ProductID;
            const matchingItemInCart = itemsInCart.find(item => item.product_id = productId);
            if (!matchingItemInCart) {
                bestOffer = item.product;
                return false;
            }
            return true;
        });
        if (bestOffer !== undefined) {
            return bestOffer;
        }
        // If we made it this far we don't have any good offers worth showing.
        throw new Error("No suitable upsell offer found");
    }
}
_BlendedUpsellStrategy_dataRepository = new WeakMap(), _BlendedUpsellStrategy_instances = new WeakSet(), _BlendedUpsellStrategy_calculateUpsellScore = function _BlendedUpsellStrategy_calculateUpsellScore(itemViewData) {
    const productViewCount = itemViewData.views;
    const productPrice = parseFloat(itemViewData.product.Price.substring(1));
    const upsellScore = productViewCount * productPrice;
    return upsellScore;
}, _BlendedUpsellStrategy_rankItems = function _BlendedUpsellStrategy_rankItems(productViews) {
    const scoredItemViews = [];
    productViews.forEach(item => {
        const computedScore = __classPrivateFieldGet(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_calculateUpsellScore).call(this, item);
        item.score = computedScore;
        scoredItemViews.push(item);
    });
    const sortedProductViews = scoredItemViews.sort(__classPrivateFieldGet(this, _BlendedUpsellStrategy_instances, "m", _BlendedUpsellStrategy_compareProductViews)).reverse();
    return sortedProductViews;
}, _BlendedUpsellStrategy_compareProductViews = function _BlendedUpsellStrategy_compareProductViews(a, b) {
    if (a.score === undefined || b.score === undefined) {
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
//# sourceMappingURL=BlendedUpsellStrategy.js.map