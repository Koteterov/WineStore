import { html, repeat, nothing } from "../../lib.js";
import {
  selectedWines,
  disablePrice,
  types,
  priceFilterValue,
  addToCart,
  showPrice,
  chooseAll,
  chooseType,
  onSearch,
} from "../../orderFunctionality.js";

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
                    max=${priceFilterValue}
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
                    value=${priceFilterValue}
                    max="40"
                  />
                </form>
              `}
          ${html`<p class="price-value">Value: ${priceFilterValue} BGN</p>`}
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
                    <h4 class="product-price">${selectedWines.price} BGN</h4>
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
    ${!selectedWines
      ? html`
          <div class="page-loading">
            <h2>Loading...</h2>
          </div>
        `
      : nothing}
  `;

