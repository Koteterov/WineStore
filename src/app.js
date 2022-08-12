import { page } from "./lib.js";
import { render } from "./lib.js";
import { aboutPage } from "./views/about.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { productsPage } from "./views/products.js";


const bodyEl = document.querySelector('body')


page(decorateContext);

page("/index.html", "/");
page("/", homePage);
page("/products", productsPage)
page("/about", aboutPage)
page("/details/:id", detailsPage)


page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, bodyEl);

    next()
}  


