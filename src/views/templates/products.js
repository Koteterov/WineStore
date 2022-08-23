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
          <form @keyup=${onSearch} class="input-form">
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

          ${disablePrice == "true"
            ? html`
                <form class="price-form">
                  <input
                    @input="40"
                    type="range"
                    class="price-filter"
                    min="0"
                    value="40"
                    max=${value}
                    disabled
                  />
                </form>
              `
            : html`
                <form class="price-form">
                  <input
                    @input=${showPrice}
                    type="range"
                    class="price-filter"
                    min="0"
                    value=${value}
                    max="40"
                  />
                </form>
              `}
          ${html`<p class="price-value">Value: ${value} lv</p>`}
        </div>
      </div>
      <!-- products -->
      <div class="products-container">
        ${selectedWines.length > 0
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
                    <p class="product-name">type: ${selectedWines.type}</p>
                    <h4 class="product-price">${selectedWines.price} Lv</h4>
                  </footer>
                </article>
              `
            )
          : html`<h3 class="filter-error">
              sorry, no wines matched this search
            </h3> `}
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

let value = Math.ceil(maxPrice);
let disablePrice;

// initial loading of data
let selectedWines = data;

// add wine to cart
export async function addToCart(e) {
  const wineId = e.target.parentElement.dataset.id;
  const singleWine = await getSingleWine(wineId);

  let selectedWine = chosenWines.find((w) => w.id == wineId);

  chosenWines.forEach((w) => w.id == wineId);

  // make choice unique
  if (selectedWine == undefined) {
    chosenWines.push({
      name: singleWine.name,
      type: singleWine.type,
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

  const url = e.target.baseURI.split("/")[3];

  //refresh cart
  if (url == "products") {
    page.redirect("/products");
  } else if (url == "") {
    page.redirect("/");
  }

  toggleCart();
}
// show price of wines by scroll
async function showPrice() {
  let selectedType = [...new Set(selectedWines.map((w) => w.type))];

  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  const chosenType = selectedType[0];

  const wineType = await getWineType(chosenType);

  if (selectedType.length == 1) {
    selectedWines = wineType.filter((w) => w.price < value);
  }

  if (selectedType.length > 1) {
    selectedWines = data.filter((w) => w.price < value);
  }

  if (selectedWines.length == 0) {
    selectedWines = data.filter((w) => w.price < value);
  }

  page.redirect("/products");
}

//=======================
// choose all wine types
function chooseAll() {
  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  selectedWines = data.filter((w) => w.price < value);

  document.querySelector(".search-input").value = "";
  disablePrice = "";

  page.redirect("/products");
}

// choose type of wine
async function chooseType(e) {
  const priceInput = document.querySelector(".price-filter");
  value = parseInt(priceInput.value);

  priceInput.max = priceToDispaly;
  priceInput.min = 0;

  const chosenType = e.target.id;

  const wineType = await getWineType(chosenType);

  selectedWines = wineType.filter((w) => w.price < value);

  document.querySelector(".search-input").value = "";
  disablePrice = "";

  page.redirect("/products");
}

// search functionality
function onSearch(e) {
  const searchValue = e.target.value;
  disablePrice = "true";

  selectedWines = data.filter((w) => {
    if (
      w.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
      searchValue != ""
    ) {
      return w;
    }
  });
  if (searchValue == "") {
    selectedWines = data;
    disablePrice = "";
  }
  value = Math.ceil(maxPrice);

  page.redirect("/products");
}
