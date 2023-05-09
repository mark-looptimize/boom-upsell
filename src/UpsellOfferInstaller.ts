import { Item } from "./repository/DataRepositoryInterface.js";

// Responsible for making sure the upsell offer element is correctly placed on the page
export class UpsellOfferInstaller {
  #product: Item;

  constructor(product: Item) {
    this.#product = product;
    this.#installComponent();
  }

  #installComponent(){
    console.log(this.#product);
  }
}