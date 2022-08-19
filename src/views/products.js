import { html, repeat, nothing } from "../lib.js";
import { page } from "../lib.js";
import { getList, getSingleWine } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { logout } from "../api/data.js";
import { toggleCart } from "./utils.js";
import { cartTemplate } from "./templates/cart.js";
import { productsTemplate } from "./templates/products.js";
import { getStoredOrder } from "./utils.js";

const generalTemplate = (
  chosenWines,
  dataForCart,
  data,

  OnLogout,
  toggleCart,
  types,
  chooseAll,
  chooseType,
  addToCart,
  showPrice,
  value,
  showNoWines
) =>
  html`
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
            <li id="loginBtn">
              <a href="/login" class="nav-link"> login </a>
            </li>
            <li id="logoutBtn">
              <a @click=${OnLogout} href="javascript:void(0)" class="nav-link">
                logout
              </a>
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
          <span class="cart-item-count">${chosenWines.length}</span>
        </div>
      </div>
    </nav>

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
    ${cartTemplate(
      dataForCart, 
      )}

    <!-- products -->
    ${productsTemplate(
      data,
      types,
      chooseAll,
      chooseType,
      addToCart,
      showPrice,
      value,
      showNoWines
    )}
  `;

// let tempWines = [];
export let chosenWines = getStoredOrder("tempOrder");

// initial page rendering
export async function productsPage(ctx) {
  let counter = 0;

  try {
    const data = await getList();
    const types = new Set(data.map((t) => t.type));
    const prices = data.map((p) => p.price);
    const maxPrice = Math.max(...prices);

    const dataForCart = chosenWines;


    ctx.render(
      generalTemplate(
        chosenWines,
        dataForCart,
        data,

        OnLogout,
        toggleCart,
        types,
        chooseAll,
        chooseType,
        addToCart

        // dataForCart,
        // data,
        // OnLogout,
        // toggleCart,
        // types,
        // chooseAll,
        // chooseType,
        // addToCart,
      )
    );

    setUserNav();

    const priceInput = document.querySelector(".price-filter");
    const priceToDispaly = Math.ceil(maxPrice);
    priceInput.max = priceToDispaly;
    priceInput.min = 0;

    let price = null;

    // add wine to cart
    async function addToCart(e) {
      const wineId = e.currentTarget.dataset.id;
      const singleWine = await getSingleWine(wineId);

      let selectedWine = chosenWines.find((w) => w.id == wineId);

      // make choice unique
      if (selectedWine == undefined) {
        chosenWines.push({
          name: singleWine.name,
          price: singleWine.price,
          imgUrl: singleWine.imgUrl,
          id: singleWine._id,
          qty: 1,
          total: singleWine.price,
          grandTotal: singleWine.price,
        });
      }


      let tempGrandTotal = chosenWines
        .map((x) => Number(x.total))
        .reduce((a, b) => a + b, 0);

      chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));
      toggleCart("/products");

      price = singleWine.price;

      //refresh cart
      ctx.page.redirect("/products");

      toggleCart();
    }

    // show price of all wines
    function showPrice() {
      const value = parseInt(priceInput.value);

      const winesByPrice = data.filter((w) => w.price < value);
      const showNoWines = winesByPrice == 0;

      ctx.render(
        productsTemplate(
          data,
          OnLogout,
          toggleCart,
          types,
          chooseAll,
          chooseType,
          addToCart

          // OnLogout,
          // winesByPrice,
          // toggleCart,
          // types,
          // chooseAll,
          // chooseType,
          // addToCart,
          // showPrice,
          // value,
          // showNoWines
        )
      );
    }

    // choose all wine types
    function chooseAll() {
      ctx.render(
        productsTemplate(
          data,
          OnLogout,
          toggleCart,
          types,
          chooseAll,
          chooseType,
          addToCart

          // data,
          // OnLogout,
          // toggleCart,
          // types,
          // chooseAll,
          // chooseType,
          // addToCart,
          // showPrice
        )
      );
    }

    // choose type of wine
    function chooseType(e) {
      const chosenType = e.target.id;

      const selectedWines = data.filter((w) => w.type == chosenType);

      // show price of chosen wines
      function showChosenByPrice() {
        const value = parseInt(priceInput.value);
        const SelectedWinesByPrice = selectedWines.filter(
          (w) => w.price < value
        );
        const showNoWines = SelectedWinesByPrice == 0;

        ctx.render(
          productsTemplate(
            data,
            OnLogout,
            toggleCart,
            types,
            chooseAll,
            chooseType,
            addToCart

            // OnLogout,
            // SelectedWinesByPrice,
            // toggleCart,
            // types,
            // chooseAll,
            // chooseType,
            // addToCart,
            // showChosenByPrice,
            // value,
            // showNoWines
          )
        );
      }

      showChosenByPrice();
    }



    // logout
    async function OnLogout() {
      await logout();
      setUserNav();
      ctx.page.redirect("/products");
    }
  } catch (error) {
    console.log(error);
  }
}







//remove qty
// function onRemove() {
//   toggleCart("/products");

//   // const wineId = e.currentTarget.dataset.id;
//   // const wineToRemove = chosenWines.find((x) => x.id == wineId);
//   // const index = chosenWines.indexOf(wineToRemove)

//   // chosenWines.splice(index, 1)

// }




//===================
// cart

{
  /* <div class="cart-overlay">
<aside class="cart">
  <button @click=${closeCart} class="cart-close">
    <i class="fas fa-times"></i>
  </button>
  <header>
    <h3 class="text-slanted">your bag</h3>
  </header>
  <!-- cart items -->
  <div class="cart-items"></div>

  ${chosenWines.map(x => html `
  <article class="cart-item" data-id= ${x.id}>
        <img src="${x.imgUrl}" class="cart-item-img" alt="${x.imgUrl}">
        <div>
          <h4 class="cart-item-name">${x.name}</h4>
          <p class="cart-item-price">${x.price} lv / pc</p>
          <button class="cart-item-remove-btn" data-id=${x.id}>
            remove
          </button>
        </div>

        <div>
          <button @click=${onIncrease} class="cart-item-increase-btn" data-id=${x.id}>
            <i class="fas fa-chevron-up"></i>
          </button>
          <p  class="cart-item-amount cart-order" data-id=${x.id}>${x.qty}</p>
          <button @click =${onDecrease} class="cart-item-decrease-btn" data-id=${x.id}>
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
      </article>
  `)}

  <!-- footer -->
  <footer>
    <h3 class="cart-total text-slanted">
      total : ${Number(chosenWines[0]?.grandTotal).toFixed(2) || 0.00}
    </h3>
    <button class="cart-checkout btn">checkout</button>
  </footer>
</aside>
</div> */
}
