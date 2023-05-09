export interface DataRepository {
  getItemsViewed(): ProductViewData[]
  getInCartProducts(): InCartItem[]
  registerItemView(item: Item): void
  get productsViewed(): InMemoryDatabase
}

export interface ProductInfo {
  Title: string,
  Url: string,
  ItemId: number,
  LastViewedDate: number,
  ImageUrl: string,
  Categories: string[],
  Metadata: ProductMetadata
}

export type ProductViewData = [ProductInfo, number];

export interface ProductMetadata {
  Brand: string,
  Price: string,
  CompareAtPrice: string,
}

export interface InCartItem {
  product_id: number,
  quantity: number,
  product_title: string,
  final_price: number
}

export interface OcuIncartService {
  cart_items: InCartItem[]
}

// Data type represented by window.item
export interface Item {
  Brand: string,
  Categories: string[],
  CompareAtPrice: string,
  ImageUrl: string,
  Name: string,
  Price: string,
  ProductID: number,
  URL: string
}

export interface ItemViewData {
  views: number,
  product: Item
}

export type InMemoryDatabase = Map<number, ItemViewData>;
