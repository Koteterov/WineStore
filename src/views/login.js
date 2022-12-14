import { html } from "../lib.js";
import { login } from "../api/data.js";
import { setUserNav, notify, toggleNavigation } from "../utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";

const loginTemplate = (data, onSubmit) => html`

    <!-- navbar -->
    ${navTemplate()}

      <!-- cart -->
      ${cartTemplate(data)}

    <!-- hero -->
    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Login</h3>
      </div>
    </section>

    
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
                Please login to finalize your order!
                <p class="message">You have no account? <a href="/register">Register</a></p>

              </p>
            </form>
          </div>
        </section>


`;

export async function loginPage(ctx) {
  const data = chosenWines;

  ctx.render(loginTemplate(data, onSubmit));

  // due to HEROKU service...
  document.querySelector(".page-loading").style.display = "none";

  toggleNavigation();
  setUserNav();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      return notify("Please fill in both fields!");
    }

    try {
      await login(email, password);

      ctx.page.redirect("/products");
    } catch (error) {
      notify(error.message)
    }
  }
}
