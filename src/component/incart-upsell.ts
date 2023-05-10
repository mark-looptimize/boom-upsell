import {html, css, LitElement, TemplateResult} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Item } from '../repository/DataRepositoryInterface.js';

@customElement('incart-upsell')
export class IncartUpsell extends LitElement {
  @property({ type: Object })
  item?: Item

  override connectedCallback(): void {
    super.connectedCallback();
    this.item = window.looptimize?.upsellProduct;
  }

  protected render(): TemplateResult {
    if (this.item === undefined || window.sessionStorage.getItem('in_cart_promo') === 'added') {
      return html``;
    } else {
      this.#pushPromoViewToDataLayer();
      return this.#renderUpsell();
    };
  }

  #renderUpsell(): TemplateResult {
    const item = this.item!;
    return html`
    <aside>
      ${item.Name} ${item.Price} <button @click=${this.#handlePromotionSelection}>Add To Cart</button>
    </aside>
    `;
  }

  async #handlePromotionSelection(): Promise<void> {
    this.#pushPromoSelectionToDataLayer();
    window.sessionStorage.setItem('in_cart_promo', 'added');
    const requestPayload = new FormData();
    // requestPayload.append("form_type", "product");
    // requestPayload.append("utf-8", "✓"),
    requestPayload.append("id", this.item!.ProductID.toString());
    requestPayload.append("quantity", "1");
    requestPayload.append("id", this.item!.ProductID.toString());
    requestPayload.append("quantity", "1");

    const response = await fetch('https://www.boombycindyjoseph.com/cart/add.js', {
      method: "POST",
      redirect: "follow",
      body: requestPayload
    });
  }

  #pushPromoSelectionToDataLayer(): void {
    const item = this.item!;
    window.dataLayer?.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer?.push({
      event: "select_promotion",
      ecommerce: {
        creative_name: "in_cart_upsell",
        creative_slot: "in_cart_promo_slot",
        promotion_id: "looptimize_upsell",
        promotion_name: "In Cart Upsell Experiment",
        items: [
          {
            item_id: item.ProductID.toString(),
            item_name: item.Name,
            index: 0,
            quantity: 1
          }
        ]
      }
    });
  }

  #pushPromoViewToDataLayer(): void {
    const item = this.item!;
    window.dataLayer?.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer?.push({
      event: "view_promotion",
      ecommerce: {
        creative_name: "in_cart_upsell",
        creative_slot: "in_cart_promo_slot",
        promotion_id: "looptimize_upsell",
        promotion_name: "In Cart Upsell Experiment",
        items: [
          {
            item_id: item.ProductID.toString(),
            item_name: item.Name,
            index: 0,
            quantity: 1
          }
        ]
      }
    });
  }
}
