import { html } from "../../../src/lib.js";
import { chosenWines } from "../products.js";
import { toggleCart, OnLogout } from "../../utils.js";

export const navTemplate = () => html`
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
          <li class="loginBtn">
            <a href="/login" class="nav-link"> login </a>
          </li>
          <li id="registerBtn">
            <a href="/register" class="nav-link"> register </a>
          </li>
          <li class="yourOrderBtn">
            <a href="/your-order" class="nav-link"> your orders </a>
          </li>
          <li class="logoutBtn">
            <a @click=${OnLogout} href="javascript:void(0)" class="nav-link">
              logout
            </a>
          </li>
        </ul>
      </div>
      <!-- logo -->
      <span id="logo-black" class="logo-text nav-logo">'Wine is Fine'</span>

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
                <i>&#9750;</i>
                home
              </a>
            </li>
            <li>
              <a href="/products" class="sidebar-link">
                <i>&#8473;</i>
                products
              </a>
            </li>
            <li>
              <a href="/about" class="sidebar-link">
                <i>&#10064;</i>
                about
              </a>
            </li>
            <li class="loginBtn">
              <a href="/login" class="sidebar-link">
                <i>&#10004;</i>
                login
              </a>
            </li>
            <li id="registerBtn">
              <a href="/register" class="sidebar-link">
                <i>&#9997;</i>
                register
              </a>
            </li>
            <li class="yourOrderBtn">
              <a href="/your-order" class="sidebar-link">
                <i>&#9871;</i>
                your orders
              </a>
            </li>
            <li class="logoutBtn">
              <a
                @click=${OnLogout}
                href="javascript:void(0)"
                class="sidebar-link"
              >
                <i>&#10006;</i>
                logout
              </a>
            </li>
          </ul>
        </aside>
      </div>

      <!-- cart icon -->
      <div class="toggle-container">
        <button @click=${toggleCart} class="toggle-cart">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <span class="cart-item-count">${chosenWines.length}</span>
      </div>
    </div>
  </nav>
`;
