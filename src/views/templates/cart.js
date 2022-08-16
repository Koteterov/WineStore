import { html, nothing } from "../../../src/lib.js";

export const cartTemplate = (closeCart, data, checkOut) => html`
  <div class="cart-overlay">
    <aside class="cart">
      <button @click=${closeCart} class="cart-close">
        <i class="fas fa-times"></i>
      </button>
      <header>
        <h3 class="text-slanted">your bag</h3>
      </header>
      <!-- cart items -->
      <div class="cart-items">
        ${
          data.length > 0
            ? data.map(
                (x) => html`       
            <article class="cart-item" data-id= ${x.id}>
              <img src="${x.imgUrl}" class="cart-item-img" alt="">
              <div>
                <h4 class="cart-item-name">${x.name}</h4>
                <p class="cart-item-price">${x.price} lv / pc</p>
                <button class="cart-item-remove-btn" data-id="">
                  remove
                </button>
              </div>

              <div>
                <button class="cart-item-increase-btn" data-id=${x.id}>
                  <i class="fas fa-chevron-up"></i>
                </button>
                <p class="cart-item-amount" data-id="">${x.qty}</p>
                <button class="cart-item-decrease-btn" data-id=${x.id}>
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
            </article>
        </div>
    
  `
              )
            : html`<h3 class="cart-total text-slanted">Your bag is empty</h3>`
        }
        ${html`
          <!-- footer -->
          <footer>
            <h3 class="cart-total text-slanted">
              ${data[0]
                ? html`total : ${Number(data[0].grandTotal).toFixed(2)} lv`
                : nothing}
            </h3>
            <a href="/order" @click=${checkOut} class="cart-checkout btn"
              >checkout</a
            >
          </footer>
        `}
      </aside>
      
  </div>
`;

/* 
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
      <!-- footer -->
      <footer>
        <h3 class="cart-total text-slanted">total : $12.99</h3>
        <button class="cart-checkout btn">checkout</button>
      </footer>
    </aside>
  </div>

*/
