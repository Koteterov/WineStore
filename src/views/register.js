import { html } from "../lib.js";
import { register } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";



const registerTemplate = (data, onSubmit) => html `

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


        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>


`

export async function registerPage(ctx) {
    const data = chosenWines;

    ctx.render(registerTemplate(data, onSubmit));
    setUserNav();

  
    async function onSubmit(e) {
      e.preventDefault();
  
  
      const formData = new FormData(e.target);
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();
      const rePassword = formData.get("re-password").trim();
  
      try {
        if (!email || !password) {
          throw new Error("Please fill in all fields");
        }
  
        if (password != rePassword) {
          throw new Error("Paswords don't match");
        }
  
        await register(email, password)
        setUserNav()
        ctx.page.redirect('/products')
  
      } catch (error) {
        alert(error.message);
      }
    }
}
