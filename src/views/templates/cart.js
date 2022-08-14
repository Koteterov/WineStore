import { html, nothing } from "../../../src/lib.js";


export const cartTemplate = (closeCart, data, checkOut) => html `
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

    ${ data[0] ? html `       
    
    
    <article class="cart-item" data-id= ${data[0]._id}>
              <img src="${data[0].imgUrl}" class="cart-item-img" alt="">
              <div>
                <h4 class="cart-item-name">${data[0].name}</h4>
                <p class="cart-item-price">${data[0].price}</p>
                <button class="cart-item-remove-btn" data-id="">
                  remove
                </button>
              </div>

              <div>
                <button class="cart-item-increase-btn" data-id="">
                  <i class="fas fa-chevron-up"></i>
                </button>
                <p class="cart-item-amount" data-id="">0</p>
                <button class="cart-item-decrease-btn" data-id="">
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
            </article>

    
        </div>

      <!-- footer -->
      <footer>
        <h3 class="cart-total text-slanted">total : ${Number(data[0].price * data[1]).toFixed(2)} lv</h3>
        <a href="/order" @click=${checkOut} class="cart-checkout btn">checkout</a>
      </footer>
    </aside>
  </div>
` : html `<h3 class="cart-total text-slanted">Your bag is empty</h3>`}

     


`