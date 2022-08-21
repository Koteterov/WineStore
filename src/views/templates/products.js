import { html, repeat, page, nothing } from "../../../src/lib.js";
import { getList, getSingleWine, getWineType } from "../../api/data.js";
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
          ${value == undefined
            ? html` <p class="price-value">Choose Price & Wine Type</p> `
            : html` <p class="price-value">Value: ${value} lv</p>`}
        </div>
      </div>
      <!-- products -->
      <div class="products-container">
        ${isPriceChosen == false
          ? repeat(
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
          : repeat(
              selectedByPrice,
              (i) => i._id,
              (selectedByPrice) => html`
                <article class="product">
                  <div class="product-container">
                    <img
                      src="${selectedByPrice.imgUrl}"
                      class="product-img img"
                      alt="${selectedByPrice.imgUrl}"
                    />

                    <div class="product-icons">
                      <a
                        href="/details/${selectedByPrice._id}"
                        class="product-icon"
                      >
                        <i class="fas fa-search"></i>
                      </a>
                      <button
                        @click=${addToCart}
                        class="product-cart-btn product-icon"
                        data-id="${selectedByPrice._id}"
                      >
                        <i class="fas fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                  <footer>
                    <p class="product-name">${selectedByPrice.name}</p>
                    <h4 class="product-price">${selectedByPrice.price} Lv</h4>
                  </footer>
                </article>
              `
            )}
        ${showNoMatches
          ? html`<h3 class="filter-error">
              sorry, no wines matched this range
            </h3>`
          : nothing}
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
const priceToDispaly = Math.ceil(maxPrice);

let value;
let selectedWines = data;
let selectedByPrice = [];
let isPriceChosen = false;
let showNoMatches = false;

// add wine to cart
async function addToCart(e) {
  const wineId = e.target.parentElement.dataset.id;
  const singleWine = await getSingleWine(wineId);

  let selectedWine = chosenWines.find((w) => w.id == wineId);

  chosenWines.forEach((w) => w.id == wineId);

  // make choice unique
  if (selectedWine == undefined) {
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

  //refresh cart
  page.redirect("/products");
  toggleCart();
}

// show price of wines by scroll
async function showPrice() {
  isPriceChosen = true;
  showNoMatches = false;

  let selectedType = new Set(selectedWines.map((w) => w.type));
  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  if (selectedType.size == 1) {
    selectedByPrice = selectedWines.filter((w) => w.price < value);
  }

  if (selectedType.size > 1) {
    selectedByPrice = selectedWines.filter((w) => w.price < value);
  }

  if (selectedByPrice.length == 0) {
    showNoMatches = true;
  }

  page.redirect("/products");
}

// choose all wine types
function chooseAll() {
  isPriceChosen = false;
  showNoMatches = false;

  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  selectedWines = data;
  value = undefined;

  page.redirect("/products");
}

// choose type of wine
async function chooseType(e) {
  isPriceChosen = false;
  showNoMatches = false;

  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  const chosenType = e.target.id;

  const wineType = await getWineType(chosenType);
  selectedWines = wineType;

  value = undefined;

  page.redirect("/products");
}

