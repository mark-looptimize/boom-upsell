import { DataRepository, InCartItem, InMemoryDatabase, Item, ItemViewData } from "./DataRepositoryInterface.js";

export class InMemoryDataRepository implements DataRepository {
  
  #productViews: InMemoryDatabase = new Map<number, ItemViewData>();

  registerItemView(item: Item): void {
    const productId = item.ProductID;

    if (this.#productViews.has(productId)) {
      // Increment the view count
      const productViewData = this.#productViews.get(productId)!;
      productViewData.views++;
      this.#productViews.set(productId, productViewData);
    } else {
      this.#productViews.set(productId, {
        product: item,
        views: 1
      });
    }
  }

  get itemsInCart(): InCartItem[] {
    const inCartItems: InCartItem[] = [{
      product_id: 6678277816433,
      quantity: 1,
      product_title: 'Boomstick Rose Nude',
      final_price: 2800
    }];
    
    return inCartItems;
  }

  get productsViewed(): InMemoryDatabase {
    return this.#productViews;
  }
}