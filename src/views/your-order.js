import { html, repeat, page } from "../lib.js";
import { setUserNav } from "./utils.js";
import { navTemplate } from "./templates/navbar.js";
import { cartTemplate } from "./templates/cart.js";
import { chosenWines } from "./products.js";
import { myOrders } from "../api/data.js";

const yourOrderTemplate = (
  orderId,
  orderTime,
  data,
  chosenOrders,
  totalAllOrders,
  chooseAllOrders,
  chooseSingleOrder,
  showTotalAllOrders
) => html`
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

  <!-- total -->
  ${showTotalAllOrders
    ? html`
        <section class="section section-center about-page">
          <div class="title">
            <h2 class="order-message">this is a list of all ordered wines</h2>
            <h2 class="order-message">
              total sum of your orders:<span
                >${"/ "}${totalAllOrders + " BGN"}</span
              >
            </h2>
          </div>
        </section>
      `
    : html`
        <section class="section section-center about-page">
          <div class="title">
            <h2 class="order-message">
              total for the selected order:<span
                >${"/ "}${Number(chosenOrders[0].grandTotal).toFixed(2) +
                " BGN"}</span
              >
            </h2>
          </div>
        </section>
      `}

  <!-- products -->
  <section class="products">
    <!-- filters -->
    <div class="filters">
      <div class="filters-container">
        <!-- categories -->
        <h4>Your Orders</h4>
        <article class="companies">
          <button @click=${chooseAllOrders} class="orders">All Orders</button>
          ${orderId.map(
            (x, i) => html`
              <button @click=${chooseSingleOrder} id=${x} class="orders">
                Order of ${orderTime[i]}
              </button>
            `
          )}
        </article>
      </div>
    </div>
    <!-- products -->
    <div class="products-container">
      ${chosenOrders.length > 0
        ? repeat(
            chosenOrders,
            (i) => i.id,
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
                  <h4 class="product-price">totally: ${Number(order.total).toFixed(2)} BGN</h4>
                </footer>
              </article>
            `
          )
        : html`<h3 id="no-order" class="filter-error">
            you have no order yet
          </h3> `}
    </div>
  </section>
`;

export async function yourOrderPage(ctx) {
  try {
    const data = chosenWines;
    const user = sessionStorage.getItem("userId");
    const yourOrders = await myOrders(user);

    let chosenOrders = yourOrders.map((x) => JSON.parse(x.order)).flat();
    const orderId = yourOrders.map((x) => x._id);
    const orderTime = yourOrders
      .map((x) => x._createdOn)
      .map((t) => new Date(t).toLocaleString("sv"));

    let totalAllOrders = chosenOrders
      .map((x) => Number(x.total))
      .reduce((a, b) => a + b, 0)
      .toFixed(2);

    let showTotalAllOrders = true;

    ctx.render(
      yourOrderTemplate(
        orderId,
        orderTime,
        data,
        chosenOrders,
        totalAllOrders,
        chooseAllOrders,
        chooseSingleOrder,
        showTotalAllOrders
      )
    );
    setUserNav();

    function chooseAllOrders() {
      showTotalAllOrders = true;

      chosenOrders = yourOrders.map((x) => JSON.parse(x.order)).flat();

      ctx.render(
        yourOrderTemplate(
          orderId,
          orderTime,
          data,
          chosenOrders,
          totalAllOrders,
          chooseAllOrders,
          chooseSingleOrder,
          showTotalAllOrders
        )
      );
    }

    function chooseSingleOrder(e) {
      showTotalAllOrders = false;
      const orderNr = e.target.id;
      chosenOrders = yourOrders
        .filter((x) => x._id == orderNr)
        .map((x) => JSON.parse(x.order))
        .flat();

      console.log("chosenOrders", chosenOrders);

      ctx.render(
        yourOrderTemplate(
          orderId,
          orderTime,
          data,
          chosenOrders,
          totalAllOrders,
          chooseAllOrders,
          chooseSingleOrder,
          showTotalAllOrders
        )
      );
    }
  } catch (error) {
    console.log(error);
  }
}
