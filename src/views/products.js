import { html } from "../lib.js";
import { setUserNav, toggleNavigation, getStoredOrder } from "../utils.js";
import { cartTemplate } from "./templates/cart.js";
import { navTemplate } from "./templates/navbar.js";
import { productsTemplate } from "./templates/wines.js";

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

  // due to HEROKU service...
  document.querySelector(".page-loading").style.display = "none";

  toggleNavigation();
  setUserNav();
}
