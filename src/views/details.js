import { html, nothing } from "../lib.js";
import { getSingleWine } from "../api/data.js";

const productTemplate = (wine) => html `

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
              <a href="/" class="nav-link">
                home
              </a>
            </li>
            <li>
              <a href="/products" class="nav-link">
                products
              </a>
            </li>
            <li>
              <a href="/about" class="nav-link">
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
            <button class="addToCartBtn btn" data-id=${wine._id}>
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

export async function detailsPage(ctx) {

  try {
    const wine = await getSingleWine(ctx.params.id)
    console.log(wine);
      ctx.render(productTemplate(wine));
  
    
  } catch (error) {
    console.log(error);
  }
  }
  
