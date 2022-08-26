import { html } from "../lib.js";

const notFoundTemplate = () => html` <h2>Not found</h2>`;

export function notFoundPage(ctx) {
  ctx.render(notFoundTemplate());
}
