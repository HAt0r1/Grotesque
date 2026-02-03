import "./style.css";

async function init() {
    const serviceMod = await import("./js/service-carousell.js");
    serviceMod.initServiceCarousel?.(document);

    const reviewsMod = await import("./js/reviews-carousel.js");
    reviewsMod.initReviewsCarousel?.(document);
}

const totalPartials = document.querySelectorAll(
    '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;

let loadedPartialsCount = 0;

if (totalPartials === 0) {
    init();
} else {
    document.body.addEventListener("htmx:afterOnLoad", () => {
        loadedPartialsCount++;
        if (loadedPartialsCount === totalPartials) init();
    });
}
