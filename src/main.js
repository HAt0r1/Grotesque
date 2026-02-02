import "./style.css";

async function init() {
    const mod = await import("./js/service-carousell.js");


    mod.initServiceCarousel?.(document);
}

const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]',
).length;

let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});