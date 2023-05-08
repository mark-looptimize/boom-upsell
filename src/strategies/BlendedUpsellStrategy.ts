import { DataRepository, ProductInfo, ProductViewData } from "../repository/DataRepositoryInterface.js";
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

  findBestOffer(): ProductInfo {
    const itemsInCart = this.#dataRepository.getInCartProducts();
    const viewedItems = this.#dataRepository.getItemsViewed();
    const rankedItems = this.#rankItems(viewedItems);

    let bestOffer: ProductInfo | undefined;

    // Move through the ranked list of product views and check if that item
    // already exists in the cart and stop looking when we find a match
    // https://masteringjs.io/tutorials/fundamentals/foreach-break
    rankedItems.every(product => {
      const productId = product[0].ItemId;
      const matchingItemInCart = itemsInCart.find(item => item.product_id = productId);
      if (!matchingItemInCart) {
        bestOffer = product[0];
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

  #calculateUpsellScore(productViewData: ProductViewData): number{
    const productInfo = productViewData[0];
    const productViewCount = productViewData[1];
    const productPrice = parseFloat(productInfo.Metadata.Price.substring(1));

    const upsellScore = productViewCount * productPrice;
    return upsellScore;
  }

  // Assign each product view a score based on a combination of views and price and 
  // then rank them from highest to lowest to find the best potential upsell offers.
  #rankItems(productViews: ProductViewData[]){
    const scoredProductViews: ProductViewData[] = productViews.map(productView => {
      const upsellScore = this.#calculateUpsellScore(productView);

      return [productView[0], upsellScore]
    });

    const sortedProductViews = scoredProductViews.sort(this.#compareProductViews);

    return sortedProductViews;
  }
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description
  #compareProductViews(a: ProductViewData, b: ProductViewData): number{
    if (a[1] < b[1]) {
      return -1;
    }

    if (a[1] > b[1]) {
      return 1;
    }

    return 0;
  }
}