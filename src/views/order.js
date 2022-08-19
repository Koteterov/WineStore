import { html } from "../lib.js";
import { login } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";



const orderTemplate = (data, onSubmit) => html`
    <!-- navbar -->

    ${navTemplate()}

      <!-- cart -->
      ${cartTemplate(data)}

    <!-- hero -->
    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Order</h3>
      </div>
    </section>

      </div>
    </nav>
        <section id="login">
          <div class="form">
            <h2>Order</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="name" id="email" placeholder="name" />
              <input type="text" name="price" id="email" placeholder="price" />
              <input
                type="text"
                name="quantity"
                id="quantity"
                placeholder="quantity"
              />
              <button type="submit">order</button>
              <p class="message">
                Please click to finalize your order!</a>
              </p>
            </form>
          </div>
        </section>


`;

export async function orderPage(ctx) {
  const data = chosenWines;

  ctx.render(orderTemplate(data, onSubmit));

  setUserNav()
  

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
