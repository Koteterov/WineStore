import { page } from "./lib.js";
import { setStoredOrder, notify } from "./utils.js";
import { chosenWines } from "./views/products.js";

// remove wine
export function onRemove(e) {
  const path = `/${e.target.baseURI.split("/")[3]}`;

  const wineId = e.currentTarget.dataset.id;
  const wineToRemove = chosenWines.find((x) => x.id == wineId);
  const index = chosenWines.indexOf(wineToRemove);
  chosenWines.splice(index, 1);

  chosenWines.forEach(
    (x) => (x.grandTotal = x.grandTotal - wineToRemove.total)
  );
  page.redirect(path);
}

//increase qty
export function onIncrease(e) {
  const url = e.target.baseURI.split("/");

  let path;
  if (url[4] == undefined) {
    path = `/${url[3]}`;
  } else {
    path = `/${url[3]}/${url[4]}`;
  }
  page.redirect(path);

  const wineId = e.currentTarget.dataset.id;
  const increasedQty = chosenWines.find((x) => x.id == wineId);
  const price = chosenWines.find((x) => x.id == wineId).price;

  increasedQty.qty++;
  increasedQty.total = increasedQty.qty * price;

  let tempGrandTotal = chosenWines
    .map((x) => Number(x.total))
    .reduce((a, b) => a + b, 0);

  chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));
}

//decrease qty
export function onDecrease(e) {
  const url = e.target.baseURI.split("/");

  let path;
  if (url[4] == undefined) {
    path = `/${url[3]}`;
  } else {
    path = `/${url[3]}/${url[4]}`;
  }
  page.redirect(path);

  const wineId = e.currentTarget.dataset.id;

  const decreasedQty = chosenWines.find((x) => x.id == wineId);

  const price = chosenWines.find((x) => x.id == wineId).price;

  const index = chosenWines.indexOf(decreasedQty);

  decreasedQty.qty--;

  if (decreasedQty.qty < 0) {
    decreasedQty.qty = 0;
  }
  if (decreasedQty.qty == 0) {
    chosenWines.splice(index, 1);
  }

  decreasedQty.total = decreasedQty.qty * price;

  let tempGrandTotal = chosenWines
    .map((x) => Number(x.total))
    .reduce((a, b) => a + b, 0);

  chosenWines.forEach((x) => (x.grandTotal = tempGrandTotal));
}

// close cart
export function closeCart() {
  const cartOverlay = document.querySelector(".cart-overlay");
  setStoredOrder("tempOrder", chosenWines);
  cartOverlay.classList.remove("show");
}

// checkout
export function onCheckout() {
  const cartOverlay = document.querySelector(".cart-overlay");
  setStoredOrder("tempOrder", chosenWines);
  const user = sessionStorage.getItem("userId");

  if (chosenWines.length == 0) {
    page.redirect("/products");
    return notify("Please choose wines!");
  }

  if (user) {
    cartOverlay.classList.remove("show");
    page.redirect("/order");
    return notify("Please confirm your order!");
  } else {
    page.redirect("/login");
    return notify("Please login to finalize your order!");
  }
}
