import { ProductInfo } from "../repository/DataRepositoryInterface.js";

export interface UpsellStrategy {
  findBestOffer(): ProductInfo
}