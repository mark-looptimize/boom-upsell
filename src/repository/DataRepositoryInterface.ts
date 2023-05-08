export interface DataRepository {
  getItemsViewed(): ProductViewData[]
  getInCartProducts(): InCartItem[]
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
