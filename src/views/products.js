import { html, repeat, nothing } from "../lib.js";
import { getList, getSingleWine } from "../api/data.js";
import { setUserNav } from "./utils.js";
import { logout } from "../api/data.js";
import { toggleCart } from "./utils.js";


const productsTemplate = (
  OnLogout,
  onIncrease,
  onDecrease,

  isAddedToCart,
  data,
  toggleCart,
  closeCart,
  types,
  chooseAll,
  chooseType,
  addToCart,
  removeFromCart,
  onCheckout,
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
              <a @click=${OnLogout} href="javascript:void(0)" class="nav-link"> logout </a>
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
          <span class="cart-item-count">0</span>
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
    <div class="cart-overlay">
      <aside class="cart">
        <button @click=${closeCart} class="cart-close">
          <i class="fas fa-times"></i>
        </button>
        <header>
          <h3 class="text-slanted">your bag</h3>
        </header>

        <!-- cart items -->
        <div class="cart-items">
          ${html`
            <article class="cart-item" data-id=${data._id}>
              <img src="" class="cart-item-img" alt=${data.imgUrl} />
              <div>
                <h4 class="cart-item-name"></h4>
                <p class="cart-item-price"></p>
                <button
                  @click=${removeFromCart}
                  class="cart-item-remove-btn"
                  data-id=${data._id}
                >
                  remove
                </button>
              </div>

              <div>
                <button
                  @click=${onIncrease}
                  class="cart-item-increase-btn"
                  data-id=${data._id}
                >
                  <i class="fas fa-chevron-up"></i>
                </button>
                <p class="cart-item-amount" data-id=${data._id}></p>
                <button
                  @click=${onDecrease}
                  class="cart-item-decrease-btn"
                  data-id=${data._id}
                >
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>
            </article>
          `}
        </div>

        <!-- footer -->
        <footer>
          ${data
            ? html`
                <h3 class="cart-total text-slanted">
                  total : ${data.price} Lv
                </h3>
              `
            : html` <h3 class="cart-total text-slanted">total : 0.00 Lv</h3> `}
          <button @click=${onCheckout} class="cart-checkout btn">
            checkout
          </button>
        </footer>
      </aside>
    </div>
    <!-- products -->
    <section class="products">
      <!-- filters -->
      <div class="filters">
        <div class="filters-container">
          <!-- search -->
          <form class="input-form">
            <input type="text" class="search-input" placeholder="search..." />
          </form>
          <!-- categories -->
          <h4>Wine Type</h4>
          <article class="companies">
            <button @click=${chooseAll} class="company-btn">All</button>
            ${repeat(
              types,
              (i) => i._id,
              (data) => html`
                <button @click=${chooseType} id=${data} class="company-btn">
                  ${data}
                </button>
              `
            )}
          </article>
          <!-- price -->
          <h4>Price</h4>
          <form class="price-form">
            <input
              @input=${showPrice}
              type="range"
              class="price-filter"
              min="0"
              value="50"
              max="100"
            />
          </form>
          ${value == undefined
            ? html` <p class="price-value">Choose Price & Wine Type</p> `
            : html` <p class="price-value">Value: ${value} lv</p>`}
        </div>
      </div>
      <!-- products -->
      <div class="products-container">
        ${showNoWines
          ? html`<h3 class="filter-error">
              sorry, no wines matched this range
            </h3>`
          : repeat(
              data,
              (i) => i._id,
              (data) => html`
                <article class="product">
                  <div class="product-container">
                    <img
                      src="${data.imgUrl}"
                      class="product-img img"
                      alt="${data.imgUrl}"
                    />

                    <div class="product-icons">
                      <a href="/details/${data._id}" class="product-icon">
                        <i class="fas fa-search"></i>
                      </a>
                      <button
                        @click=${addToCart}
                        class="product-cart-btn product-icon"
                        data-id="${data._id}"
                      >
                        <i class="fas fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                  <footer>
                    <p class="product-name">${data.name}</p>
                    <h4 class="product-price">${data.price} Lv</h4>
                  </footer>
                </article>
              `
            )}
      </div>
    </section>
    <!-- page loading -->
    <!-- <div class="page-loading">
      <h2>Loading...</h2>
    </div> -->
  `;

export let chosenWines = []




// initial page rendering
export async function productsPage(ctx) {
  let isAddedToCart = false;
  let counter = 0;

console.log('chosenWines - Products', chosenWines);


  try {
    const data = await getList();
    const types = new Set(data.map((t) => t.type));
    const prices = data.map((p) => p.price);
    const maxPrice = Math.max(...prices);

    ctx.render(
      productsTemplate(
        OnLogout,

        onIncrease,
        onDecrease,
        isAddedToCart,
        data,
        toggleCart,
        closeCart,
        types,
        chooseAll,
        chooseType,
        addToCart,
        removeFromCart,
        onCheckout
      )
    );

    setUserNav();

    if (isAddedToCart == false) {
      document.querySelector(".cart-item").style.display = "none";
    }

    const priceInput = document.querySelector(".price-filter");
    const priceToDispaly = Math.ceil(maxPrice);
    priceInput.max = priceToDispaly;
    priceInput.min = 0;

    let price = null;

     // add wine to cart
    async function addToCart(e) {
      isAddedToCart = true;
      const wineId = e.currentTarget.dataset.id;
      const singleWine = await getSingleWine(wineId);

      chosenWines.push({
        name: singleWine.name,
        price: singleWine.price,
        imgUrl: singleWine.imgUrl,
        id: singleWine._id,
        qty: 0
      })

      price = singleWine.price;

      toggleCart();
      document.querySelector(".cart-item-increase-btn").dataset.id = singleWine._id;
      document.querySelector(".cart-item-decrease-btn").dataset.id = singleWine._id;

      document.querySelector(".cart-item").style.display = "";
      document.querySelector(".cart-item-img").src = singleWine.imgUrl;
      document.querySelector(".cart-item-name").textContent = singleWine.name;
      document.querySelector(
        ".cart-item-price"
      ).textContent = `${singleWine.price} lv`;
      document.querySelector('.cart-item-amount').textContent = 0
      document.querySelector('.cart-total').textContent = `total: 0.00 lv`
    }

    // show price of all wines
    function showPrice() {
      const value = parseInt(priceInput.value);

      const winesByPrice = data.filter((w) => w.price < value);
      const showNoWines = winesByPrice == 0;

      ctx.render(
        productsTemplate(
          OnLogout,

          onIncrease,
          onDecrease,

          isAddedToCart,
          winesByPrice,
          toggleCart,
          closeCart,
          types,
          chooseAll,
          chooseType,
          addToCart,
          removeFromCart,
          onCheckout,
          showPrice,
          value,
          showNoWines
        )
      );
    }

    // choose all wine types
    function chooseAll() {
      ctx.render(
        productsTemplate(
          OnLogout,

          onIncrease,
          onDecrease,

          isAddedToCart,
          data,
          toggleCart,
          closeCart,
          types,
          chooseAll,
          chooseType,
          addToCart,
          removeFromCart,
          onCheckout,
          showPrice
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
            OnLogout,

            onIncrease,
            onDecrease,

            isAddedToCart,
            SelectedWinesByPrice,
            toggleCart,
            closeCart,
            types,
            chooseAll,
            chooseType,
            addToCart,
            removeFromCart,
            onCheckout,
            showChosenByPrice,
            value,
            showNoWines
          )
        );
      }

      showChosenByPrice();
    }

    //increase qty
    function onIncrease() {
      let qtySpan = document.querySelector(".cart-item-count");
      let qty = document.querySelector(".cart-item-amount");
      counter++;
      qty.textContent = counter;
      qtySpan.textContent = counter;

      let total = document.querySelector(".cart-total");
      total.textContent = `total: ${Number(counter * price).toFixed(2)} lv`;
    }

    //decrease qty
    function onDecrease() {
      let qtySpan = document.querySelector(".cart-item-count");
      let qty = document.querySelector(".cart-item-amount");

      counter--;
      if (counter < 0) {
        counter = 0;
      }
      if (counter == 0) {
        document.querySelector(".cart-item").style.display = "none";
      }
      let total = document.querySelector(".cart-total");
      total.textContent = `total: ${Number(counter * price).toFixed(2)} lv`;

      qty.textContent = counter;
      qtySpan.textContent = counter;
    }
    // clear cart
    function removeFromCart() {

      document.querySelector(".cart-close").addEventListener("click", () => {
        cartOverlay.classList.remove("show");
      });

      document.querySelector(".cart-item").style.display = "none";
      let total = document.querySelector(".cart-total");
      total.textContent = `total: 0.00 lv`;

      let qtySpan = document.querySelector(".cart-item-count");
      qtySpan.textContent = 0;

      let qty = document.querySelector(".cart-item-amount");
      qty.textContent = 0;
    }

    // checkout btn
    function onCheckout() {
      ctx.page.redirect("/");
    }

    // toggle cart
    const cartOverlay = document.querySelector(".cart-overlay");
    function closeCart() {
      
      const chosenQty = document.querySelector('.cart-item-amount').textContent

      //push temp info
      const wineId = document.querySelector('.cart-item-decrease-btn').dataset.id
      // chosenWines.map(x => {
      //   if (x.id == wineId) {
      //     x.qty = chosenQty
      //   }
      // })
      chosenWines.forEach(x => {
        if (x.id == wineId) {
              x.qty = chosenQty
            }
      })
      
      cartOverlay.classList.remove("show");
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
