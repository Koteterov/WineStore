import { html, repeat, page } from "../../../src/lib.js";
import { getList, getSingleWine } from "../../api/data.js";
import { chosenWines } from "../products.js";
import { toggleCart } from "../utils.js";

export const productsTemplate = () =>
  html`
    <section class="products">
      <!-- filters -->
      <div class="filters">
        <div class="filters-container">
          <!-- search -->
          <form class="input-form">
            <input type="text" class="search-input" placeholder="search..." />
          </form>
          <!-- categories -->
          <h4>Wine Type</h4>
          <article class="companies">
            <button @click=${chooseAll} class="company-btn">All</button>
            ${repeat(
              types,
              (i) => i._id,
              (data) => html`
                <button @click=${chooseType} id=${data} class="company-btn">
                  ${data}
                </button>
              `
            )}
          </article>
          <!-- price -->
          <h4>Price</h4>
          <form class="price-form">
            <input
              @input=${showPrice}
              type="range"
              class="price-filter"
              min="0"
              value="50"
              max="100"
            />
          </form>
          ${
            html` <p class="price-value">Choose Price & Wine Type</p> `
            // value == undefined
            // ? html` <p class="price-value">Choose Price & Wine Type</p> `
            // : html` <p class="price-value">Value: ${value} lv</p>`
          }
        </div>
      </div>
      <!-- products -->
      <div class="products-container">
        ${
          // repeat(
          //   data,
          //   (i) => i._id,
          //   (data) => html`
          //     <article class="product">
          //       <div class="product-container">
          //         <img
          //           src="${data.imgUrl}"
          //           class="product-img img"
          //           alt="${data.imgUrl}"
          //         />

          //         <div class="product-icons">
          //           <a href="/details/${data._id}" class="product-icon">
          //             <i class="fas fa-search"></i>
          //           </a>
          //           <button
          //             @click=${addToCart}
          //             class="product-cart-btn product-icon"
          //             data-id="${data._id}"
          //           >
          //             <i class="fas fa-shopping-cart"></i>
          //           </button>
          //         </div>
          //       </div>
          //       <footer>
          //         <p class="product-name">${data.name}</p>
          //         <h4 class="product-price">${data.price} Lv</h4>
          //       </footer>
          //     </article>
          //   `
          // )

          showAllWines
            ? repeat(
                data,
                (i) => i._id,
                (data) => html`
                  <article class="product">
                    <div class="product-container">
                      <img
                        src="${data.imgUrl}"
                        class="product-img img"
                        alt="${data.imgUrl}"
                      />

                      <div class="product-icons">
                        <a href="/details/${data._id}" class="product-icon">
                          <i class="fas fa-search"></i>
                        </a>
                        <button
                          @click=${addToCart}
                          class="product-cart-btn product-icon"
                          data-id="${data._id}"
                        >
                          <i class="fas fa-shopping-cart"></i>
                        </button>
                      </div>
                    </div>
                    <footer>
                      <p class="product-name">${data.name}</p>
                      <h4 class="product-price">${data.price} Lv</h4>
                    </footer>
                  </article>
                `
              )
            : // html`<h3 class="filter-error">
              //     sorry, no wines matched this range
              //   </h3>`
              repeat(
                selectedWines,
                (i) => i._id,
                (selectedWines) => html`
                  <article class="product">
                    <div class="product-container">
                      <img
                        src="${selectedWines.imgUrl}"
                        class="product-img img"
                        alt="${selectedWines.imgUrl}"
                      />

                      <div class="product-icons">
                        <a
                          href="/details/${selectedWines._id}"
                          class="product-icon"
                        >
                          <i class="fas fa-search"></i>
                        </a>
                        <button
                          @click=${addToCart}
                          class="product-cart-btn product-icon"
                          data-id="${selectedWines._id}"
                        >
                          <i class="fas fa-shopping-cart"></i>
                        </button>
                      </div>
                    </div>
                    <footer>
                      <p class="product-name">${selectedWines.name}</p>
                      <h4 class="product-price">${selectedWines.price} Lv</h4>
                    </footer>
                  </article>
                `
              )
        }
      </div>
    </section>
    <!-- page loading -->
    <!-- <div class="page-loading">
      <h2>Loading...</h2>
    </div> -->
  `;

const data = await getList();
const types = new Set(data.map((t) => t.type));
const prices = data.map((p) => p.price);
const maxPrice = Math.max(...prices);

// const priceInput = document.querySelector(".price-filter");
// const priceToDispaly = Math.ceil(maxPrice);
// priceInput.max = priceToDispaly;
// priceInput.min = 0;

let price = null;

let selectedWines = [];
let showAllWines = true;

// add wine to cart
async function addToCart(e) {
  const wineId = e.target.parentElement.dataset.id;
  const singleWine = await getSingleWine(wineId);

  let selectedWine = chosenWines.find((w) => w.id == wineId);

  chosenWines.forEach((w) => w.id == wineId);

  // make choice unique
  if (!selectedWine) {
    chosenWines.push({
      name: singleWine.name,
      price: singleWine.price,
      imgUrl: singleWine.imgUrl,
      id: singleWine._id,
      qty: 1,
      total: singleWine.price,
      grandTotal: singleWine.price,
    });
  }

  let tempGrandTotal = chosenWines
    .map((x) => Number(x.total))
    .reduce((a, b) => a + b, 0);

  chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));

  price = singleWine.price;

  //refresh cart
  page.redirect("/products");
  toggleCart();
}

// show price of all wines
// const value = parseInt(priceInput.value);

// const winesByPrice = data.filter((w) => w.price < value);
// const showNoWines = winesByPrice == 0;

function showPrice() {}

// choose all wine types
function chooseAll() {
  showAllWines = true;
  page.redirect("/products");
}

// choose type of wine
function chooseType(e) {
  showAllWines = false;
  const priceInput = document.querySelector(".price-filter");
  const priceToDispaly = Math.ceil(maxPrice);
  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  const chosenType = e.target.id;

  selectedWines = data.filter((w) => w.type == chosenType);

  page.redirect("/products");

  // show price of chosen wines
  function showChosenByPrice() {
    const value = parseInt(priceInput.value);
    const SelectedWinesByPrice = selectedWines.filter((w) => w.price < value);
  }

  showChosenByPrice();
}
