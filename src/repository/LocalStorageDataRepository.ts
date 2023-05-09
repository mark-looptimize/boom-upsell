import { DataRepository, InCartItem, InMemoryDatabase, Item, ItemViewData } from "./DataRepositoryInterface.js";

const localStorageKey = 'looptimize_icu';

export class LocalStorageDataRepository implements DataRepository {
  
  #productViews: InMemoryDatabase;

  constructor(){
    this.#productViews = this.#fetchDataFromLocalStorage();
  }

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

    this.#persistData();
  }

  get itemsInCart(): InCartItem[] {
    if(window.OCUIncart.cart_items !== undefined){
      const inCartItems = window.OCUIncart.cart_items as InCartItem[];
      return inCartItems;
    }

    throw new Error("Unable to determine in cart items");
  }

  public get productsViewed(): InMemoryDatabase {
    this.#productViews = this.#fetchDataFromLocalStorage();
    return this.#productViews;
  }

  #persistData(): void {
    const serializedData = JSON.stringify(this.#productViews);
    window.localStorage.setItem(localStorageKey, serializedData);
  }

  #fetchDataFromLocalStorage(): InMemoryDatabase {
    const localStorageData = window.localStorage.getItem(localStorageKey);

    if (localStorageData === null) {
      return new Map<number, ItemViewData>();
    } else {
      const deserializedData: InMemoryDatabase = JSON.parse(localStorageData);
      return deserializedData;
    }
  }
}