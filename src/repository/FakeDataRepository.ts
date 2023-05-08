import { DataRepository, InCartItem, ProductViewData } from "./DataRepositoryInterface.js";
import { exampleData } from "./example_data.js";

export class FakeDataRepository implements DataRepository {
  #dataSource: string;

  constructor() {
    this.#dataSource = exampleData;
  }

  getInCartProducts(): InCartItem[] {
    const inCartItems: InCartItem[] = [{
      product_id: 6678277816433,
      quantity: 1,
      product_title: 'Boomstick Rose Nude',
      final_price: 2800
    }];
    
    return inCartItems;
  }

  getItemsViewed(): ProductViewData[] {
    const parsedData = JSON.parse(this.#dataSource) as ProductViewData[];
    return parsedData;
  }
}