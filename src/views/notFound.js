import { html } from "../lib.js";

const notFoundTemplate = () => html`<h2>404 Not Found</h2>`;

export function notFoundPage(ctx) {
  ctx.render(notFoundTemplate());
}
