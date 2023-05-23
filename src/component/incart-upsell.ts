import {html, css, LitElement, TemplateResult, svg} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Item } from '../repository/DataRepositoryInterface.js';

const giftIcon = svg`<path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />`;

@customElement('incart-upsell')
export class IncartUpsell extends LitElement {
  @property({ type: Object })
  item?: Item

  static styles = css`
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    aside {
      display: flex;
      justify-content: center;
    }
    details {
      width: 100%;
      padding: 1rem 2rem;
      background-color: #ffecec;
      animation: fadeIn 3s;
    }
    summary {
      justify-content: center;
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    button {
      background-color: black;
      color: white;
      padding: 1rem;
      border-radius: 30px;
    }

    .special-offer {
      margin: auto;
      max-width: 30rem;
      margin-top: 1rem;
      padding: 2rem 5rem;
      background-color: white;
      border: 1px solid black;
      border-radius: 30px;
      display: flex;
      gap: 2rem;
    }

    .special-offer img {
      border-radius: 30px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .special-offer a {
      text-decoration: none;
      color: black;
    }

    .special-offer a:hover {
      text-decoration: underline;
    }
  `;

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

  #isDiscountedPrice(): boolean {
    const originalPrice =  Number(this.item!.CompareAtPrice.replace(/[^0-9.-]+/g,""));
    const salePrice =  Number(this.item!.Price.replace(/[^0-9.-]+/g,""));
    
    return salePrice < originalPrice;
  }

  #renderUpsell(): TemplateResult {
    const item = this.item!;
    console.log(item);
    return html`
    <aside>
      <details>
        <summary>
          Click here to view our special offer just for you. 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24">
          ${giftIcon}
          </svg>
        </summary>
        <div class="special-offer">
          <img src="${item.ImageURL}" width="180" />
          <div class="offer-details">
            <a href="${item.URL}"><h3>${item.Name}</h3></a> 
            <p>${this.#renderPrice()}</p>
            <p>
              <small>Try it 100% risk free with our money back guarantee.</small>
            </p>
            <button @click=${this.#handlePromotionSelection}>Add To Cart</button>
          </div>
        </div>
      </details>
      
    </aside>
    `;
  }

  #renderPrice(): TemplateResult {
    if (this.#isDiscountedPrice()) {
      return html`
      <p>
        <s>
        <strong>Regular Retail Price:</strong> ${this.item?.CompareAtPrice}
        </s>
      </p>
      <p>
        <strong>Your Price:</strong> ${this.item?.Price}
      </p>
      `;
    } else {
      return html`
      <p>
        <strong>Offer Price:</strong> ${this.item?.Price}
      </p>
      `;
    }
  }

  async #handlePromotionSelection(): Promise<void> {
    this.#pushPromoSelectionToDataLayer();
    window.sessionStorage.setItem('in_cart_promo', 'added');
    const requestPayload = new FormData();
    // requestPayload.append("form_type", "product");
    // requestPayload.append("utf-8", "✓"),
    // requestPayload.append("id", this.item!.ProductID.toString());
    // requestPayload.append("quantity", "1");
    requestPayload.append("id", this.item!.ProductID.toString());
    requestPayload.append("quantity", "1");

    const response = await fetch('https://www.boombycindyjoseph.com/cart/add.js', {
      method: "POST",
      redirect: "follow",
      body: requestPayload
    });

    // Refresh the window
    location.reload();
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
