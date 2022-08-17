import { html, nothing } from "../../../src/lib.js";

export const navTemplate = (OnLogout, toggleCart, countWines) => html `
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
          <span class="cart-item-count">${countWines.length}</span>
        </div>
      </div>
    </nav>


`