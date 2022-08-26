import { page } from "./lib.js";
import { logout } from "./api/data.js";

export function setUserNav() {
  const userId = sessionStorage.getItem("userId");

  if (userId != null) {
    document
      .querySelectorAll(".loginBtn")
      .forEach((x) => (x.style.display = "none"));
    document.getElementById("registerBtn").style.display = "none";
    document
      .querySelectorAll(".logoutBtn")
      .forEach((x) => (x.style.display = "block"));
    document
      .querySelectorAll(".yourOrderBtn")
      .forEach((x) => (x.style.display = "block"));
  } else {
    document
      .querySelectorAll(".loginBtn")
      .forEach((x) => (x.style.display = "inline"));
    document.getElementById("registerBtn").style.display = "inline";
    document
      .querySelectorAll(".logoutBtn")
      .forEach((x) => (x.style.display = "none"));
    document
      .querySelectorAll(".yourOrderBtn")
      .forEach((x) => (x.style.display = "none"));
  }
}

export function toggleCart(path) {
  const cartOverlay = document.querySelector(".cart-overlay");
  cartOverlay.classList.add("show");

  page.redirect(path);
}

export function toggleNavigation() {
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

export const getStoredOrder = (item) => {
  let storageItem = localStorage.getItem(item);
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item));
  } else {
    storageItem = [];
  }
  return storageItem;
};

export const setStoredOrder = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

export async function OnLogout() {
  await logout();
  setUserNav();
  page.redirect("/products");
}

export function notify(message) {
  const divEl = document.getElementById("errorBox");
  const spanEl = divEl.querySelector("span");
  spanEl.textContent = message;
  divEl.style.display = "block";

  setTimeout(() => (divEl.style.display = "none"), 3000);
}
