import { html, nothing } from "../lib.js";
import { getTempData, setUserNav } from "./utils.js";
import { logout } from "../api/data.js";
import { chosenWines } from "./products.js";
import { toggleCart } from "./utils.js";
import { cartTemplate } from "./templates/cart.js";

const homeTemplate = (
  closeCart,
  data,
  checkOut,
  onIncrease,
  onDecrease,
  OnLogout,
  toggleCart,
  chosenWines,
  path
) => html`
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

  ${cartTemplate(
    closeCart,
    data,
    checkOut,
    onIncrease,
    onDecrease,
    toggleCart,
    path
  )}

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
      <!-- <article class="product">
          <div class="product-container">
            <img src="./images/main-bcg.jpeg" class="product-img img" alt="" />
           
            <div class="product-icons">
              <a href="product.html?id=1" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="1">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">name</p>
            <h4 class="product-price">$9.99</h4>
          </footer>
        </article> -->
      <!-- end of single product -->
    </div>
    <a href="/products" class="btn"> all products </a>
  </section>
`;

export async function homePage(ctx) {
  // get temp order total
  const data = getTempData(chosenWines);

  const path = ctx.path;

  ctx.render(
    homeTemplate(
      closeCart,
      data,
      checkOut,
      onIncrease,
      onDecrease,
      OnLogout,
      toggleCart,
      chosenWines,
      path
    )
  );
  setUserNav();

  console.log("home", data);

  // toggle cart
  const cartOverlay = document.querySelector(".cart-overlay");
  function closeCart() {
    cartOverlay.classList.remove("show");
  }

  function onIncrease() {}
  function onDecrease() {}

  function checkOut() {}

  async function OnLogout() {
    await logout();
    setUserNav();
    ctx.page.redirect("/products");
  }
}

// onRemove()
