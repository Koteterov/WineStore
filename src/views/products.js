import { html, repeat, nothing } from "../lib.js";
import { until } from "../lib.js";
import { page } from "../lib.js";
import { getList, getSingleWine } from "../api/data.js";
import { setUserNav } from "../utils.js";
import { cartTemplate } from "./templates/cart.js";
import { navTemplate } from "./templates/navbar.js";
import { productsTemplate } from "./templates/products.js";
import { getStoredOrder } from "../utils.js";

const generalTemplate = (dataForCart) =>
  html`
    <!-- navbar -->
    ${navTemplate()}

    <!-- hero -->
    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Products</h3>
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
            <a href="/" class="sidebar-link">
              <i class="fas fa-home fa-fw"></i>
              home
            </a>
          </li>
          <li>
            <a href="/products" class="sidebar-link">
              <i class="fas fa-couch fa-fw"></i>
              products
            </a>
          </li>
          <li>
            <a href="/about" class="sidebar-link">
              <i class="fas fa-book fa-fw"></i>
              about
            </a>
          </li>
        </ul>
      </aside>
    </div>

    <!-- cart -->
    ${cartTemplate(dataForCart)}

    <!-- products -->
    ${productsTemplate()}
  `;

export let chosenWines = getStoredOrder("tempOrder");

// initial page rendering
export async function productsPage(ctx) {
  const dataForCart = chosenWines;

  ctx.render(generalTemplate(dataForCart));

  setUserNav();
}
