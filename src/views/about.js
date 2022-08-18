import { html, nothing } from "../lib.js";
import { getTempData, setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { logout } from "../api/data.js";
import { toggleCart } from "./utils.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";

const aboutTemplate = (OnLogout, toggleCart, countWines, closeCart, data ) => html`
  <!-- navbar -->

  ${navTemplate(OnLogout, toggleCart, countWines)}

  <!-- hero -->
  <section class="page-hero">
    <div class="section-center">
      <h3 class="page-hero-title">Home / About</h3>
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

  ${cartTemplate(closeCart, data)}

  <!-- about -->
  <section class="section section-center about-page">
    <div class="title">
      <h2><span>/</span> our wine history</h2>
    </div>
    <p class="about-text">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
      accusantium sapiente tempora sed dolore esse deserunt eaque excepturi,
      delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos
      quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi
      blanditiis est exercitationem molestiae delectus saepe odio eligendi modi
      porro eaque in libero minus unde sapiente consectetur architecto. Ullam
      rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed
      quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
      iste.
    </p>
  </section>
`;

export async function aboutPage(ctx) {
  const data = getTempData(chosenWines);
  // let lastIndex = chosenWines.length - 1
  // const data = chosenWines[lastIndex - 1]?.price * chosenWines[lastIndex] || 0

  ctx.render(aboutTemplate(OnLogout, toggleCart, chosenWines, closeCart, data));

  setUserNav();

  // toggle cart
  const cartOverlay = document.querySelector(".cart-overlay");
  function closeCart() {
    cartOverlay.classList.remove("show");
  }


  // logout
  async function OnLogout() {
    await logout();
    setUserNav();
    ctx.page.redirect("/products");
  }
}
