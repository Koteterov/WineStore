import { html, repeat } from "../lib.js";
import { getList } from "../api/data.js";

const productsTemplate = (data, toggleCart, closeCart, types, chooseAll, chooseType, showPrice, value, showNoWines) =>
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
              <a href="/" class="nav-link">
                home
              </a>
            </li>
            <li>
              <a href="/products" class="nav-link">
                products
              </a>
            </li>
            <li>
              <a href="/about" class="nav-link">
                about
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
          <span class="cart-item-count">1</span>
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
        <div class="cart-items"></div>
        <!-- footer -->
        <footer>
          <h3 class="cart-total text-slanted">
            total : $12.99
          </h3>
          <button class="cart-checkout btn">checkout</button>
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
            ${repeat(types, i => i._id, data => html `
            <button @click=${chooseType} id=${data} class="company-btn">${data}</button>
            `)}
          </article>
          <!-- price -->
          <h4>Price</h4>
          <form class="price-form">
            <input @input=${showPrice}
              type="range"
              class="price-filter"
              min="0"
              value="50"
              max="100"
            />
          </form>
          ${value == undefined 
            ? html `
          <p class="price-value">Choose Price Range</p>
          `: html ` 
          <p class="price-value">Value: ${value } Lv</p>`}
        </div>
      </div>
      <!-- products -->
      <div class="products-container">
        ${ showNoWines 
          ? html `<h3 class="filter-error">sorry, no wines matched this range</h3>` 
          : repeat(data, i => i._id, data => html ` <article class="product">
          <div class="product-container">
            <img src="${data.imgUrl}" class="product-img img" alt="${data.imgUrl}" />

            <div class="product-icons">
              <a href="product.html?id=${data._id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${data._id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name">${data.name}</p>
            <h4 class="product-price">${data.price} Lv</h4>
          </footer>
        </article>  `)}
      </div>
    </section>
    <!-- page loading -->
    <!-- <div class="page-loading">
      <h2>Loading...</h2>
    </div> -->

    `

export async function productsPage(ctx) {

    
    try {
        const data = await getList();
        const types = new Set(data.map((t) => t.type));
        const prices = data.map(p => p.price)
        const maxPrice = Math.max(...prices)
        

    ctx.render(
      productsTemplate(
        data,
        toggleCart,
        closeCart,
        types,
        chooseAll,
        chooseType,
      )
    );
    const priceInput = document.querySelector('.price-filter')
    const priceToDispaly = Math.ceil(maxPrice)
    priceInput.max = priceToDispaly
    priceInput.min = 0

    function showPrice() {
        const value = parseInt(priceInput.value);
        const winesByPrice = data.filter((w) => w.price < value);

        const showNoWines = winesByPrice == 0


        ctx.render(
            productsTemplate(
              winesByPrice,
              toggleCart,
              closeCart,
              types,
              chooseAll,
              chooseType,
              showPrice,
              value,
              showNoWines
        
            )
          );
    

    }


    ctx.render(
        productsTemplate(
          data,
          toggleCart,
          closeCart,
          types,
          chooseAll,
          chooseType,
          showPrice
    
        )
      );
  

    const cartOverlay = document.querySelector(".cart-overlay");

    function chooseAll() {
      ctx.render(
        productsTemplate(
          data,
          toggleCart,
          closeCart,
          types,
          chooseAll,
          chooseType
        )
      );
    }

    function chooseType(e) {
      const chosenType = e.target.id;

      const selectedWines = data.filter((w) => w.type == chosenType);

      ctx.render(
        productsTemplate(
          selectedWines,
          toggleCart,
          closeCart,
          types,
          chooseAll,
          chooseType
        )
      );
    }


    function toggleCart() {
      cartOverlay.classList.add("show");
    }

    function closeCart() {
      cartOverlay.classList.remove("show");
    }
  } catch (error) {
    console.log(error);
  }

  //===
  const toggleNav = document.querySelector(".toggle-nav");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");
  const closeBtn = document.querySelector(".sidebar-close");

  toggleNav.addEventListener("click", () => {
    sidebarOverlay.classList.add("show");
  });
  closeBtn.addEventListener("click", () => {
    sidebarOverlay.classList.remove("show");
  });
}

//=================================
// const cartItemsDOM = getElement('.cart-items');
// const addToCartDOM = ({ id, name, price, image, amount }) => {
//   const article = document.createElement('article');
//   article.classList.add('cart-item');
//   article.setAttribute('data-id', id);
//   article.innerHTML = `
//     <img src="${image}"
//               class="cart-item-img"
//               alt="${name}"
//             />
//             <div>
//               <h4 class="cart-item-name">${name}</h4>
//               <p class="cart-item-price">${formatPrice(price)}</p>
//               <button class="cart-item-remove-btn" data-id="${id}">remove</button>
//             </div>

//             <div>
//               <button class="cart-item-increase-btn" data-id="${id}">
//                 <i class="fas fa-chevron-up"></i>
//               </button>
//               <p class="cart-item-amount" data-id="${id}">${amount}</p>
//               <button class="cart-item-decrease-btn" data-id="${id}">
//                 <i class="fas fa-chevron-down"></i>
//               </button>
//             </div>
//   `;
//   cartItemsDOM.appendChild(article);
// };
