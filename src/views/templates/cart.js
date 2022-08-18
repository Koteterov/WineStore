import { html, nothing } from "../../../src/lib.js";
import { page } from "../../../src/lib.js";
import { chosenWines } from "../products.js";

export const cartTemplate = (closeCart, data, checkOut, path) => html`
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
                  <p class="cart-item-price">${x.price} lv / pc</p>
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

// remove wine
function onRemove(e) {
  const path = `/${e.target.baseURI.split("/")[3]}`;
  page.redirect(path);

  const wineId = e.currentTarget.dataset.id;
  const wineToRemove = chosenWines.find((x) => x.id == wineId);
  const index = chosenWines.indexOf(wineToRemove);
  chosenWines.splice(index, 1);
}

// //increase qty
function onIncrease(e) {
  const path = `/${e.target.baseURI.split("/")[3]}`;
  page.redirect(path);

  const wineId = e.currentTarget.dataset.id;
  const increasedQty = chosenWines.find((x) => x.id == wineId);
  const price = chosenWines.find((x) => x.id == wineId).price;

  increasedQty.qty++;
  increasedQty.total = increasedQty.qty * price;

  let tempGrandTotal = chosenWines
    .map((x) => Number(x.total))
    .reduce((a, b) => a + b, 0);

  chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));
}

//=========================================================
// //decrease qty
function onDecrease(e) {
  const path = `/${e.target.baseURI.split("/")[3]}`;
  page.redirect(path);

  const wineId = e.currentTarget.dataset.id;

  const decreasedQty = chosenWines.find((x) => x.id == wineId);

  chosenWines.find((x) => {});

  const price = chosenWines.find((x) => x.id == wineId).price;

  const index = chosenWines.indexOf(decreasedQty);

  decreasedQty.qty--;

  if (decreasedQty.qty < 0) {
    decreasedQty.qty = 0;
  }
  if (decreasedQty.qty == 0) {
    chosenWines.splice(index, 1);
  }

  decreasedQty.total = decreasedQty.qty * price;

  let tempGrandTotal = chosenWines
    .map((x) => Number(x.total))
    .reduce((a, b) => a + b, 0);

  chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));
}
