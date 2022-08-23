import { page } from "../lib.js";
import { logout } from "../api/data.js";


export function setUserNav() {
  const userId = sessionStorage.getItem("userId");

  if (userId != null) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("registerBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("yourOrderBtn").style.display = "inline";
  } else {
    document.getElementById("loginBtn").style.display = "inline";
    document.getElementById("registerBtn").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("yourOrderBtn").style.display = "none";
  }
}

export function toggleCart(path) {
  const cartOverlay = document.querySelector(".cart-overlay");
  cartOverlay.classList.add("show");

  page.redirect(path)


}

export function getTempData(data) {

  return data;
}

export const getStoredOrder = (item) => {
  let storageItem = localStorage.getItem(item)
  if (storageItem) {
    storageItem = JSON.parse(localStorage.getItem(item))
  } else {
    storageItem = []
  }
  return storageItem
}

export const setStoredOrder = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export async function OnLogout() {
  await logout();
  setUserNav();
  page.redirect("/products");
}
