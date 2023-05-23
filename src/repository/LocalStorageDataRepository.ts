import { ServiceLogger } from "../services/Logger.js";
import { DataRepository, InCartItem, InMemoryDatabase, Item, ItemViewData } from "./DataRepositoryInterface.js";

const localStorageKey = 'looptimize_icu';

export class LocalStorageDataRepository implements DataRepository {
  
  #productViews: InMemoryDatabase;

  constructor(){
    this.#productViews = this.#fetchDataFromLocalStorage();
  }

  public get itemsInCart(): InCartItem[] {
    if(window.OCUIncart?.cart_items !== undefined){
      const inCartItems = window.OCUIncart.cart_items as InCartItem[];
      ServiceLogger.log(`Found ${inCartItems.length} items in the cart`);
      return inCartItems;
    }
    ServiceLogger.error('No existing items found in the cart');
    return [];
  }

  public registerItemView(item: Item, id: number): void {
    this.#productViews = this.#fetchDataFromLocalStorage();
    // const productId = item.ProductID;
    const productId = id;
    // Overwrite the original product ID with the one we need
    item.ProductID = id;

    if (this.#productViews.has(productId)) {
      ServiceLogger.log(`Incrementing product view count for item: ${productId}`);
      // Increment the view count
      const productViewData = this.#productViews.get(productId)!;
      productViewData.views++;
      this.#productViews.set(productId, productViewData);
    } else {
      ServiceLogger.log(`Adding new view entry for item: ${productId}`);
      const itemViewData: ItemViewData = {product: item, views: 1};
      this.#productViews.set(productId, itemViewData);
    }

    this.#persistData();
  }

  public get productsViewed(): InMemoryDatabase {
    this.#productViews = this.#fetchDataFromLocalStorage();
    return this.#productViews;
  }

  #persistData(): void {
    const serializedData = JSON.stringify([...this.#productViews.entries()]);
    ServiceLogger.log(`Persisting ${this.#productViews.size} entries to LocalStorage`);
    window.localStorage.setItem(localStorageKey, serializedData);
  }

  // Turns out deserializing between Maps and JSON strings is kind of annoying in JS :(
  #fetchDataFromLocalStorage(): InMemoryDatabase {
    const localStorageData = window.localStorage.getItem(localStorageKey);
    const tempMap = new Map<number, ItemViewData>();
    const localStorageIsEmpty = (localStorageData === null || localStorageData === '{}');

    if (localStorageIsEmpty) {
      ServiceLogger.log("No Existing LocalStorage Data Found. Creating New InMemoryDatabase");
      return tempMap;
    } else {
      const deserializedData: Array<[number, ItemViewData]> = JSON.parse(localStorageData);
      deserializedData.forEach(item => tempMap.set(item[0], item[1]));
      ServiceLogger.log(`Loading ${tempMap.size} entries from LocalStorage`);
      return tempMap;
    }
  }
}