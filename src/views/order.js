import { html } from "../lib.js";
import { setUserNav, toggleNavigation } from "../utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";
import { orderWines } from "../api/data.js";

const orderTemplate = (data, onSubmit, totalBottles) => html`
    <!-- navbar -->

    ${navTemplate()}

      <!-- cart -->
      ${cartTemplate(data)}

    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Order</h3>
      </div>
    </section>

      </div>
    </nav>
        <section id="login">
          <div class="form">
            <h2>Your Order</h2>
            <form @submit=${onSubmit} class="login-form">
            <label for="total">Total Sum</label>
            <input type="text" name="total" disabled .value=${
              data[0].grandTotal.toFixed(2) + " BGN"
            }/>

            <label for="quantity">Quantity of Bottles</label>
            <input type="text" name="quantity" disabled .value=${
              totalBottles + " pcs"
            }/>

              <label for="address">Delivery address</label>
              <input type="text" name="address"  placeholder="country, city, str. Nr..." disabled/>

              <label for="payment">Payment</label>
              <input type="text" name="payment"  placeholder="mathod of payment..." disabled/>


              <input type="text" name="order" id="order" hidden/>
              <button type="submit">confirm order</button>
              <p class="message">
              For more details on your order, please open your cart!
              </p>
            </form>
          </div>
        </section>


`;

export async function orderPage(ctx) {
  const data = chosenWines;
  const customerOrder = JSON.stringify(data);
  const totalBottles = data.map((x) => x.qty).reduce((a, b) => a + b, 0);

  ctx.render(orderTemplate(data, onSubmit, totalBottles));

  toggleNavigation();
  setUserNav();

  async function onSubmit(e) {
    e.preventDefault();

    // // ....validation + notification for the order....
    // const formData = new FormData(e.target);

    try {
      await orderWines({
        order: customerOrder,
      });
      localStorage.removeItem("tempOrder");
      chosenWines.length = 0;
      ctx.page.redirect("/products");
    } catch (error) {
      alert(error.message);
    }
  }
}
