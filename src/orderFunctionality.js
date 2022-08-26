import { page } from "./lib.js";
import { chosenWines } from "./views/products.js";
import { toggleCart } from "./utils.js";
import { getList, getSingleWine, getWineType } from "./api/data.js";

const data = await getList();
export const types = new Set(data.map((t) => t.type));
const prices = data.map((p) => p.price);

const maxPrice = Math.max(...prices);
const maxPriceToDispaly = Math.ceil(maxPrice);
export let priceFilterValue = Math.ceil(maxPrice);
export let disablePrice;

// initial loading of data
export let selectedWines = data;

// add wine to cart
export async function addToCart(e) {
  let wineId = e.target.parentElement.dataset.id;
  //- to get the id from details page
  if (wineId == undefined) {
    wineId = e.target.dataset.id;
  }

  const singleWine = await getSingleWine(wineId);

  let selectedWine = chosenWines.find((w) => w.id == wineId);

  chosenWines.forEach((w) => w.id == wineId);

  // make choice unique
  if (selectedWine == undefined) {
    chosenWines.push({
      name: singleWine.name,
      type: singleWine.type,
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

  const url = e.target.baseURI.split("/")[3];

  //refresh cart
  if (url == "products") {
    page.redirect("/products");
  } else if (url == "") {
    page.redirect("/");
  } else {
    page.redirect("/products");
  }

  toggleCart();
}

// show price of wines by scroll
export async function showPrice() {
  let selectedType = [...new Set(selectedWines.map((w) => w.type))];

  const priceInput = document.querySelector(".price-filter");
  priceFilterValue = parseInt(priceInput.value);

  priceInput.max = maxPriceToDispaly;
  priceInput.min = 0;

  const chosenType = selectedType[0];

  const wineType = await getWineType(chosenType);

  if (selectedType.length == 1) {
    selectedWines = wineType.filter((w) => w.price < priceFilterValue);
  }

  if (selectedType.length > 1) {
    selectedWines = data.filter((w) => w.price < priceFilterValue);
  }

  if (selectedWines.length == 0) {
    selectedWines = data.filter((w) => w.price < priceFilterValue);
  }

  page.redirect("/products");
}

// choose all wine types
export function chooseAll() {
  if (document.querySelector(".price-filter") != null) {
    const priceInput = document.querySelector(".price-filter");
    priceFilterValue = parseInt(priceInput.value);
    priceInput.max = maxPriceToDispaly;
    priceInput.min = 0;

    // - to show max price in scroll when redirecting from home page
  } else {
    priceFilterValue = maxPriceToDispaly;
  }

  selectedWines = data.filter((w) => w.price < priceFilterValue);

  if (document.querySelector(".search-input") != null) {
    document.querySelector(".search-input").value = "";
  }

  disablePrice = "";

  page.redirect("/products");
}

// choose type of wine
export async function chooseType(e) {
  const priceInput = document.querySelector(".price-filter");
  priceFilterValue = parseInt(priceInput.value);

  priceInput.max = maxPriceToDispaly;
  priceInput.min = 0;

  const chosenType = e.target.id;

  const wineType = await getWineType(chosenType);

  selectedWines = wineType.filter((w) => w.price < priceFilterValue);

  document.querySelector(".search-input").value = "";
  disablePrice = "";

  page.redirect("/products");
}

// search functionality
export function onSearch(e) {
  const searchValue = e.target.value;
  disablePrice = "true";

  selectedWines = data.filter((w) => {
    if (
      w.name.toLowerCase().startsWith(searchValue.toLowerCase()) &&
      searchValue != ""
    ) {
      return w;
    }
  });
  if (searchValue == "") {
    selectedWines = data;
    disablePrice = "";
  }
  priceFilterValue = maxPriceToDispaly;

  page.redirect("/products");
}
