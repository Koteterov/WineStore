import { html, repeat } from "../lib.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";
import { myOrders } from "../api/data.js";

const yourOrderTemplate = (data, order, total, chooseOrder) => html`
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

  <!-- orders -->
  <section class="order">
            ${repeat(
              order,
              (i) => i._id,
              (order) => html`
                <button @click=${chooseOrder} id=${order._id} class="orders">
                  ${111111111111}
            </button>
              `
            )}
  </section>


  <!-- total -->
  <section class="section section-center about-page">
    <div class="title">
      <h2>total price of your orders:<span>${"/ "}${total + " BGN"}</span></h2>
    </div>
  </section>

  <div class="products-container">
    ${repeat(
      order,
      (i) => i._id,
      (order) => html`
        <article class="product">
          <div class="product-container">
            <img
              src="${order.imgUrl}"
              class="product-img img"
              alt="${order.imgUrl}"
            />

            <div class="product-icons">
              <a href="/details/${order.id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
            </div>
          </div>
          <footer>
            <p class="product-name">${order.name}</p>
            <p class="product-name">type: ${order.type}</p>
            <p class="product-name">price / pc: ${order.price} BGN</p>
            <p class="product-name">ordered quantity: ${order.qty}</p>
            <h4 class="product-price">totally: ${order.total} BGN</h4>
          </footer>
        </article>
      `
    )}
  </div>
`;

export async function yourOrderPage(ctx) {
  try {
    const data = chosenWines;
    const user = sessionStorage.getItem("userId");
    const yourOrders = await myOrders(user);
    const order = yourOrders.map((x) => JSON.parse(x.order)).flat();
    const total = order
      .map((x) => Number(x.total))
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    ctx.render(yourOrderTemplate(data, order, total, chooseOrder));
    setUserNav();

    function chooseOrder(e) {
      
    }
  } catch (error) {
    console.log(error);
  }
}
