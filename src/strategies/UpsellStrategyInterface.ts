import { Item } from "../repository/DataRepositoryInterface.js";

export interface UpsellStrategy {
  findBestOffer(): Item
}