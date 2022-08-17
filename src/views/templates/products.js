import { html, repeat, nothing } from "../../../src/lib.js";

export const productsTemplate = (  
    data,
    types,
    chooseAll,
    chooseType,
    addToCart,
    showPrice,
    value,
    showNoWines,
  ) => html `
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
        ${showNoWines
          ? html`<h3 class="filter-error">
              sorry, no wines matched this range
            </h3>`
          : repeat(
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
            )}
      </div>
    </section>
    <!-- page loading -->
    <!-- <div class="page-loading">
      <h2>Loading...</h2>
    </div> -->

`
