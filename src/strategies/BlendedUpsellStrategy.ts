import { ServiceLogger } from "../services/Logger.js";
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

  public findBestOffer(): Item {
    const itemsInCart = this.#dataRepository.itemsInCart;
    const viewedItems = this.#dataRepository.productsViewed;

    ServiceLogger.log(`Finding the best offer. Current Items in cart: ${itemsInCart.length} Total Viewed Products: ${viewedItems.size} `);
    // Rank them by our scoring criteria
    const rankedItems = this.#rankItems(viewedItems);

    // Now remove any that are already in the cart. Note we have to check for both name and id for "reasons"
    const eligibleRankedItems = rankedItems.filter(item => {
      const alreadyInCart = itemsInCart.some(inCartItem => {
        const idsMatch = inCartItem.product_id === item.product.ProductID;
        const namesMatch = inCartItem.product_title === item.product.Name;
        const matchFound = idsMatch || namesMatch;
        ServiceLogger.log(`Comparing Cart Product: ${inCartItem.product_title} with id: ${inCartItem.product_id} with ${item.product.Name} id: ${item.product.ProductID} Match Found: ${matchFound}`);
        return matchFound;
      });
      return !alreadyInCart;
    });

    // Return the first item in the list
    if (eligibleRankedItems.length > 0) {
      ServiceLogger.log(`Upsell Offer found: ${eligibleRankedItems[0].product.Name}`);
      return eligibleRankedItems[0].product;
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