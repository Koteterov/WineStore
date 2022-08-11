import { html, nothing } from "../lib.js";

const productTemplate = () => html `

    <!-- navbar -->
    <nav class="navbar page">
      <div class="nav-center">
        <!-- links -->
        <div>
          <button class="toggle-nav">
            <i class="fas fa-bars"></i>
          </button>
          <ul class="nav-links">
            <li>
              <a href="index.html" class="nav-link">
                home
              </a>
            </li>
            <li>
              <a href="products.html" class="nav-link">
                products
              </a>
            </li>
            <li>
              <a href="about.html" class="nav-link">
                about
              </a>
            </li>
          </ul>
        </div>
        <!-- logo -->
        <span id="logo-black" class="logo-text nav-logo">'Wine is Fine'</span>
        <!-- cart icon -->
        <div class="toggle-container">
          <button class="toggle-cart">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <span class="cart-item-count">1</span>
        </div>
      </div>
    </nav>
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
    <div class="cart-overlay">
      <aside class="cart">
        <button class="cart-close">
          <i class="fas fa-times"></i>
        </button>
        <header>
          <h3 class="text-slanted">your bag</h3>
        </header>
        <!-- cart items -->
        <div class="cart-items"></div>
        <!-- footer -->
        <footer>
          <h3 class="cart-total text-slanted">
            total : $12.99
          </h3>
          <button class="cart-checkout btn">checkout</button>
        </footer>
      </aside>
    </div>
    <!-- product info -->
    <section class="single-product">
      <div class="section-center single-product-center">
        <img
          src="./images/main-bcg.webp"
          class="single-product-img img"
          alt=""
        />
        <article class="single-product-info">
          <div>
            <h2 class="single-product-title">couch</h2>
            <p class="single-product-company text-slanted">
              by marcos
            </p>
            <p class="single-product-price">$30.00</p>
            <div class="single-product-colors"></div>
            <p class="single-product-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id,
              modi? Minima libero doloremque necessitatibus! Praesentium
              recusandae quod nesciunt animi voluptatem!
            </p>
            <button class="addToCartBtn btn" data-id="id">
              add to cart
            </button>
          </div>
        </article>
      </div>
    </section>
    <!-- <div class="page-loading">
      <h2>loading...</h2>
    </div> -->

`

export async function productPage(ctx) {
    ctx.render(productTemplate());
  }
  
