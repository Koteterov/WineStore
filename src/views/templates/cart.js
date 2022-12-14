import { html, nothing } from "../../../src/lib.js";
import {
  onRemove,
  onIncrease,
  onDecrease,
  closeCart,
  onCheckout,
} from "../../cartFunctionality.js";

export const cartTemplate = (data) => html`
  <div class="cart-overlay">
    <aside class="cart">
      <button @click=${closeCart} class="cart-close">
        <i class="fas fa-times"></i>
      </button>
      <header>
        <h3 class="text-slanted">your bag</h3>
      </header>
      <!-- cart items -->
      <div class="cart-items"></div>
      ${data.length > 0
        ? data.map(
            (x) => html`
              <article class="cart-item" data-id=${x.id}>
                <img src="${x.imgUrl}" class="cart-item-img" alt="" />
                <div>
                  <h4 class="cart-item-name">${x.name}</h4>
                  <p class="cart-item-price">type: ${x.type}</p>
                  <p class="cart-item-price">${x.price} BGN / pc</p>
                  <button
                    @click=${onRemove}
                    class="cart-item-remove-btn"
                    data-id=${x.id}
                  >
                    remove
                  </button>
                </div>
                <div>
                  <button
                    @click=${onIncrease}
                    class="cart-item-increase-btn"
                    data-id=${x.id}
                  >
                    <i class="fas fa-chevron-up"></i>
                  </button>
                  <p class="cart-item-amount" data-id=${x.id}>${x.qty}</p>

                  <button
                    @click=${onDecrease}
                    class="cart-item-decrease-btn"
                    data-id=${x.id}
                  >
                    <i class="fas fa-chevron-down"></i>
                  </button>
                </div>
              </article>
            `
          )
        : html`<h3 class="cart-total text-slanted">Your bag is empty</h3>`}
      ${html`
        <!-- footer -->
        <footer>
          <h3 class="cart-total text-slanted">
            ${data[0]
              ? html`total : ${Number(data[0].grandTotal).toFixed(2)} BGN`
              : nothing}
          </h3>
          <a href="/order" @click=${onCheckout} class="cart-checkout btn"
            >checkout</a
          >
        </footer>
      `}
    </aside>
  </div>
`;
