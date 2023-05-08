import { DataRepository, InCartItem, ProductViewData } from "./DataRepositoryInterface.js";

export class LocalStorageDataRepository implements DataRepository {
  #localStorageKey: string;

  constructor() {
    this.#localStorageKey = '__kla_viewed';
  }
  getInCartProducts(): InCartItem[] {
    if(window.OCUIncart.cart_items !== undefined){
      const inCartItems = window.OCUIncart.cart_items as InCartItem[];
      return inCartItems;
    }

    throw new Error("Unable to determine in cart items");
  }

  getItemsViewed(): ProductViewData[] {
    const dataSource = window.localStorage.getItem(this.#localStorageKey);

    if (dataSource === null) {
      throw new Error("Data Source Not Found");
    }

    const parsedData = JSON.parse(dataSource) as ProductViewData[];
    return parsedData;
  }
}