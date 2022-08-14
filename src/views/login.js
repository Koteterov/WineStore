import { html } from "../lib.js";
import { login } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { toggleCart } from "./utils.js";


const loginTemplate = (onSubmit, closeCart, toggleCart) => html`
    <!-- navbar -->
    ${navTemplate(null, toggleCart)}


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

  setUserNav()
      // toggle cart
      const cartOverlay = document.querySelector(".cart-overlay");
      function closeCart() {
        cartOverlay.classList.remove("show");
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
