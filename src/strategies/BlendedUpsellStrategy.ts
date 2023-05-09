import { ServiceLogger } from "../Logger.js";
import { DataRepository, InMemoryDatabase, Item, ItemViewData } from "../repository/DataRepositoryInterface.js";
import { UpsellStrategy } from "./UpsellStrategyInterface.js";

/*
  Blended Strategy will determine the most apporpriate opportunity
  by multiplying the number of times a product was viewed with the price 
  of the item to calculate an [upsellScore] that we can then use to 
  rank our opportunities and find the most appropriate one.
*/
export class BlendedUpsellStrategy implements UpsellStrategy {
  #dataRepository: DataRepository;

  constructor(dataRepository: DataRepository){
    this.#dataRepository = dataRepository;
  }

  findBestOffer(): Item {
    const itemsInCart = this.#dataRepository.itemsInCart;
    const viewedItems = this.#dataRepository.productsViewed;
    ServiceLogger.log(`Finding the best offer. Current Items in cart: ${itemsInCart.length} Total Viewed Products: ${viewedItems.size} `);
    const rankedItems = this.#rankItems(viewedItems);

    let bestOffer: Item | undefined;

    // Move through the ranked list of product views and check if that item
    // already exists in the cart and stop looking when we find a match
    // https://masteringjs.io/tutorials/fundamentals/foreach-break
    rankedItems.every(item => {
      const productId = item.product.ProductID;
      const matchingItemInCart = itemsInCart.find(item => {item.product_id = productId});
      if (!matchingItemInCart) {
        ServiceLogger.log(`Upsell Offer found: ${item.product.Name}`)
        bestOffer = item.product;
        return false;
      }
      ServiceLogger.log(`${item.product.Name} is already in the cart`);
      return true;
    });

    if (bestOffer !== undefined) {
      return bestOffer;
    }

    // If we made it this far we don't have any good offers worth showing.
    throw new Error("No suitable upsell offer found");
  }

  #calculateUpsellScore(itemViewData: ItemViewData): number{
    const productViewCount = itemViewData.views;
    const productPrice = parseFloat(itemViewData.product.Price.substring(1));

    const upsellScore = productViewCount * productPrice;
    return upsellScore;
  }

  // Assign each product view a score based on a combination of views and price and 
  // then rank them from highest to lowest to find the best potential upsell offers.
  #rankItems(productViews: InMemoryDatabase): ItemViewData[]{
    const scoredItemViews: ItemViewData[] = [];
    productViews.forEach(item => {
      const computedScore = this.#calculateUpsellScore(item);
      item.score = computedScore;
      scoredItemViews.push(item);
    });

    const sortedProductViews = scoredItemViews.sort(this.#compareProductViews).reverse();

    return sortedProductViews;
  }
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description
  #compareProductViews(a: ItemViewData, b: ItemViewData): number{
    ServiceLogger.log(`Comparing Upsell Score. ${a.product.Name} with ${a.score} points and ${b.product.Name} with ${b.score} points`);
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
  }
}