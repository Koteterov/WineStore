export function setUserNav() {
  const userId = sessionStorage.getItem("userId");

  if (userId != null) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline";
  } else {
    document.getElementById("loginBtn").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "none";
  }
}

export function toggleCart() {
  const cartOverlay = document.querySelector(".cart-overlay");

  cartOverlay.classList.add("show");
}

export function getTempData(data) {

  return data;
}
