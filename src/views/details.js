import { html, nothing } from "../lib.js";
import { getSingleWine } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";
import { addToCart } from "./templates/products.js";


const productTemplate = (chosenWines, wine) => html`
  <!-- navbar -->
  ${navTemplate()}

  <!-- hero -->
  <section class="page-hero">
    <div class="section-center">
      <h3 class="page-hero-title">Home / Single Product</h3>
    </div>
  </section>
  <!-- sidebar -->
  <div class="sidebar-overlay">
    <aside class="sidebar">
      <!-- close -->
      <button class="sidebar-close">
        <i class="fas fa-times"></i>
      </button>
      <!-- links -->
      <ul class="sidebar-links">
        <li>
          <a href="index.html" class="sidebar-link">
            <i class="fas fa-home fa-fw"></i>
            home
          </a>
        </li>
        <li>
          <a href="products.html" class="sidebar-link">
            <i class="fas fa-couch fa-fw"></i>
            products
          </a>
        </li>
        <li>
          <a href="about.html" class="sidebar-link">
            <i class="fas fa-book fa-fw"></i>
            about
          </a>
        </li>
      </ul>
    </aside>
  </div>
  <!-- cart -->
  ${cartTemplate(chosenWines)}

  <!-- product info -->
  <section class="single-product">
    <div class="section-center single-product-center">
      <img
        src=${wine.imgUrl}
        class="single-product-img img"
        alt="${wine.imgUrl}"
      />
      <article class="single-product-info">
        <div>
          <h2 class="single-product-title">${wine.name}</h2>
          <p class="single-product-company text-slanted">${wine.type}</p>
          <p class="single-product-price">Price: ${wine.price} Lv</p>
          <div class="single-product-colors"></div>
          <p class="single-product-desc">Origine: ${wine.origin}</p>
          <button @click=${addToCart} class="addToCartBtn btn" data-id=${wine._id}>
            add to cart
          </button>
        </div>
      </article>
    </div>
  </section>
  <!-- <div class="page-loading">
      <h2>loading...</h2>
    </div> -->
`;

export async function detailsPage(ctx) {
  try {
    const wine = await getSingleWine(ctx.params.id);

    ctx.render(productTemplate(chosenWines, wine));
    setUserNav();

  } catch (error) {
    console.log(error);
  }
}
