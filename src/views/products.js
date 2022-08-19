import { html, repeat, nothing } from "../lib.js";
import { page } from "../lib.js";
import { getList, getSingleWine } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { cartTemplate } from "./templates/cart.js";
import { navTemplate } from "./templates/navbar.js";
import { productsTemplate } from "./templates/products.js";
import { getStoredOrder } from "./utils.js";
import { toggleCart } from "./utils.js";

const generalTemplate = (dataForCart) =>
  html`
    <!-- navbar -->
    ${navTemplate()}

    <!-- hero -->
    <section class="page-hero">
      <div class="section-center">
        <h3 class="page-hero-title">Home / Products</h3>
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
            <a href="/" class="sidebar-link">
              <i class="fas fa-home fa-fw"></i>
              home
            </a>
          </li>
          <li>
            <a href="/products" class="sidebar-link">
              <i class="fas fa-couch fa-fw"></i>
              products
            </a>
          </li>
          <li>
            <a href="/about" class="sidebar-link">
              <i class="fas fa-book fa-fw"></i>
              about
            </a>
          </li>
        </ul>
      </aside>
    </div>

    <!-- cart -->
    ${cartTemplate(dataForCart)}

    <!-- products -->
    ${productsTemplate()}
  `;

// let tempWines = [];
export let chosenWines = getStoredOrder("tempOrder");

// initial page rendering
export async function productsPage(ctx) {
  const data = await getList();
  const types = new Set(data.map((t) => t.type));
  const prices = data.map((p) => p.price);
  const maxPrice = Math.max(...prices);

  const dataForCart = chosenWines;

  ctx.render(generalTemplate(dataForCart));

  setUserNav();

  // const priceInput = document.querySelector(".price-filter");
  // const priceToDispaly = Math.ceil(maxPrice);
  // priceInput.max = priceToDispaly;
  // priceInput.min = 0;

  // let price = null;

  // // add wine to cart
  // async function addToCart(e) {
  //   const wineId = e.currentTarget.dataset.id;
  //   const singleWine = await getSingleWine(wineId);

  //   let selectedWine = chosenWines.find((w) => w.id == wineId);

  //   // make choice unique
  //   if (selectedWine == undefined) {
  //     chosenWines.push({
  //       name: singleWine.name,
  //       price: singleWine.price,
  //       imgUrl: singleWine.imgUrl,
  //       id: singleWine._id,
  //       qty: 1,
  //       total: singleWine.price,
  //       grandTotal: singleWine.price,
  //     });
  //   }

  //   let tempGrandTotal = chosenWines
  //     .map((x) => Number(x.total))
  //     .reduce((a, b) => a + b, 0);

  //   chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));

  //   price = singleWine.price;

  //   //refresh cart
  //   ctx.page.redirect("/products");
  //   toggleCart();
  // }

  // // show price of all wines
  // function showPrice() {
  //   const value = parseInt(priceInput.value);

  //   const winesByPrice = data.filter((w) => w.price < value);
  //   const showNoWines = winesByPrice == 0;

  // }

  // // choose all wine types
  // function chooseAll() {
  //   console.log('data', data);
  //   console.log('types', types);

  // }

  // // choose type of wine
  // function chooseType(e) {
  //   const chosenType = e.target.id;

  //   const selectedWines = data.filter((w) => w.type == chosenType);

  //   // show price of chosen wines
  //   function showChosenByPrice() {
  //     const value = parseInt(priceInput.value);
  //     const SelectedWinesByPrice = selectedWines.filter(
  //       (w) => w.price < value
  //     );
  //     const showNoWines = SelectedWinesByPrice == 0;

  //   }

  //   showChosenByPrice();
  // }

}
