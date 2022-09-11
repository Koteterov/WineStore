import { page } from "./lib.js";
import { render } from "./lib.js";
import { aboutPage } from "./views/about.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { notFoundPage } from "./views/notFound.js";
import { orderPage } from "./views/order.js";
import { productsPage } from "./views/products.js";
import { registerPage } from "./views/register.js";
import { yourOrderPage } from "./views/your-order.js";

const bodyEl = document.querySelector("body");

page(decorateContext);

page("/index.html", "/");
page("/", homePage);
page("/products", productsPage);
page("/about", aboutPage);
page("/details/:id", detailsPage);
page("/login", loginPage);
page("/register", registerPage);
page("/order", isGuest, orderPage);
page("/your-order", isGuest, yourOrderPage);
page("*", notFoundPage);


page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, bodyEl);

  next();
}

function isGuest(ctx, next) {
  const user = sessionStorage.getItem("userId");
  if (user == null) {
   return page.redirect("/login")
  } 
  next()
}