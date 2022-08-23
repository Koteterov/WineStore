import { html, repeat, nothing } from "../lib.js";
import { setUserNav } from "./utils.js";
import { logout } from "../api/data.js";
import { chosenWines } from "./products.js";
import { toggleCart } from "./utils.js";
import { cartTemplate } from "./templates/cart.js";
import { OnLogout } from "./utils.js";
import { getList } from "../api/data.js";
import { addToCart } from "./templates/products.js";

const homeTemplate = (chosenWines, OnLogout, toggleCart, winesOfWeek) => html`
  <!-- navbar -->
  <nav class="navbar">
    <div class="nav-center">
      <!-- links -->
      <div>
        <button class="toggle-nav">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-links">
          <li>
            <a href="/" class="nav-link"> home </a>
          </li>
          <li>
            <a href="/products" class="nav-link"> products </a>
          </li>
          <li>
            <a href="/about" class="nav-link"> about </a>
          </li>
          <li id="loginBtn">
            <a href="/login" class="nav-link"> login </a>
          </li>
          <li id="logoutBtn">
            <a @click=${OnLogout} href="javascript:void(0)" class="nav-link">
              logout
            </a>
          </li>
        </ul>
      </div>
      <!-- logo -->
      <span class="logo-text nav-logo">'Wine is Fine'</span>
      <!-- cart icon -->
      <div class="toggle-container">
        <button @click=${toggleCart} class="toggle-cart">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <span class="cart-item-count">${chosenWines.length}</span>
      </div>
    </div>
  </nav>
  <!-- hero -->
  <section class="hero">
    <div class="hero-container">
      <h1 class="text-slanted">chose, taste, come back</h1>
      <h3>Make your choice - we are here to help</h3>
      <a href="/products" class="hero-btn"> show now </a>
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

  ${cartTemplate(chosenWines)}

  <!-- featured products -->
  <section class="section featured">
    <div class="title">
      <h2><span>/</span>Wines of the Week</h2>
    </div>
    <div class="featured-center section-center">
      <!-- <h2 class="section-loading">
          loading...
        </h2> -->

      <!-- single product -->
      ${repeat(
        winesOfWeek,
        (i) => i._id,
        (winesOfWeek) => html`
          <article class="product">
            <div class="product-container">
              <img
                src=${winesOfWeek.imgUrl}
                class="product-img img"
                alt=${winesOfWeek.name}
              />

              <div class="product-icons">
                <a href="/details/${winesOfWeek._id}" class="product-icon">
                  <i class="fas fa-search"></i>
                </a>
                <button
                  @click=${addToCart}
                  class="product-cart-btn product-icon"
                  data-id=${winesOfWeek._id}
                >
                  <i class="fas fa-shopping-cart"></i>
                </button>
              </div>
            </div>
            <footer>
              <p class="product-name">${winesOfWeek.name}</p>
              <h4 class="product-price">${winesOfWeek.price} lv</h4>
            </footer>
          </article>
        `
      )}
      <!-- end of single product -->
    </div>
    <a href="/products" class="btn"> all products </a>
  </section>
`;

export async function homePage(ctx) {
  const data = await getList();
  const winesOfWeek = data.filter((w, i) => {
    if (i == 1 || i == 5 || i == 9) {
      return w;
    }
  });

  console.log('winesOfWeek', winesOfWeek);
  ctx.render(homeTemplate(chosenWines, OnLogout, toggleCart, winesOfWeek));
  setUserNav();
}
