import { Item } from "../repository/DataRepositoryInterface.js";
import { UpsellStrategy } from "./UpsellStrategyInterface.js";

export class DefaultUpsellStrategy implements UpsellStrategy {
  findBestOffer(): Item {
    // Just throw here and let the origial one click upsell script do it's thing
    throw new Error("Method not implemented.");
  }
  
}