import { html } from "../lib.js";
import { login } from "../api/data.js";
import { setUserNav } from "./utils.js";

const loginTemplate = (onSubmit, closeCart, toggleCart) => html`
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
              <a href="/" class="nav-link"> home </a>
            </li>
            <li>
              <a href="/products" class="nav-link"> products </a>
            </li>
            <li>
              <a href="/about" class="nav-link"> about </a>
            </li>
          </ul>
        </div>
        <!-- logo -->
        <span id="logo-black" class="logo-text nav-logo">'Wine is Fine'</span>
        <!-- cart icon -->
        <div class="toggle-container">
          <button @click=${toggleCart} class="toggle-cart">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <span class="cart-item-count">1</span>
        </div>
      </div>
    </nav>

      <!-- cart -->
  <div class="cart-overlay">
    <aside class="cart">
      <button @click=${closeCart} class="cart-close">
        <i class="fas fa-times"></i>
      </button>
      <header>
        <h3 class="text-slanted">your bag</h3>
      </header>
      <!-- cart items -->
      <div class="cart-items"></div>
      <!-- footer -->
      <footer>
        <h3 class="cart-total text-slanted">total : $12.99</h3>
        <button class="cart-checkout btn">checkout</button>
      </footer>
    </aside>
  </div>

    <!-- hero -->
    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Login</h3>
      </div>
    </section>

      </div>
    </nav>
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Please login to finalize your order!</a>
              </p>
            </form>
          </div>
        </section>


`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit, closeCart, toggleCart));

      // toggle cart
      const cartOverlay = document.querySelector(".cart-overlay");
      function closeCart() {
        cartOverlay.classList.remove("show");
      }
      function toggleCart() {
        // const cartOverlay = document.querySelector(".cart-overlay");
    
        cartOverlay.classList.add("show");
      }
  

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      await login(email, password);


      ctx.page.redirect("/products");
    } catch (error) {
      alert(error.message);
    }
  }
}
