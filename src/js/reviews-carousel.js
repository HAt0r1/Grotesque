export function initReviewsCarousel(doc = document) {
    console.log("Hello reviews carousel!");
    const list = doc.querySelector(".reviews__list");
    if (!list) return;

    const root = list.closest(".reviews") || document.body;

    // Слайди
    const slides = Array.from(list.children).filter((el) =>
        el.classList.contains("reviews__list-item")
    );

    if (slides.length === 0) return;

    // ---------- UI: Prev/Next + Dots (створюємо якщо нема) ----------
    let prevBtn = root.querySelector('[data-action="reviews-prev"]');
    let nextBtn = root.querySelector('[data-action="reviews-next"]');
    let dotsWrap = root.querySelector(".reviews__dots");

    if (!prevBtn) {
        prevBtn = doc.createElement("button");
        prevBtn.type = "button";
        prevBtn.dataset.action = "reviews-prev";
        prevBtn.className = "reviews__button reviews__btn--prev";
        prevBtn.setAttribute("aria-label", "Previous review");
        prevBtn.textContent = "‹";
        root.appendChild(prevBtn);
    }

    if (!nextBtn) {
        nextBtn = doc.createElement("button");
        nextBtn.type = "button";
        nextBtn.dataset.action = "reviews-next";
        nextBtn.className = "reviews__button reviews__btn--next";
        nextBtn.setAttribute("aria-label", "Next review");
        nextBtn.textContent = "›";
        root.appendChild(nextBtn);
    }

    if (!dotsWrap) {
        dotsWrap = doc.createElement("div");
        dotsWrap.className = "reviews__dots";
        dotsWrap.setAttribute("role", "tablist");
        dotsWrap.setAttribute("aria-label", "Reviews navigation");
        root.appendChild(dotsWrap);
    } else {
        dotsWrap.innerHTML = "";
    }

    const dots = slides.map((_, i) => {
        const b = doc.createElement("button");
        b.type = "button";
        b.className = "reviews__dot";
        b.dataset.index = String(i);
        b.setAttribute("role", "tab");
        b.setAttribute("aria-label", `Go to review ${i + 1}`);
        dotsWrap.appendChild(b);
        return b;
    });

    // ---------- Логіка ----------
    let index = 0;

    function clampIndex(i) {
        return Math.max(0, Math.min(i, slides.length - 1));
    }

    function scrollToIndex(i, behavior = "smooth") {
        index = clampIndex(i);
        const target = slides[index];

        // offsetLeft працює стабільно для flex-елементів у scroll контейнері
        list.scrollTo({
            left: target.offsetLeft,
            behavior,
        });

        syncUI();
    }

    function syncUI() {
        // disable кнопок
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;

        // активний dot
        dots.forEach((d, i) => {
            const active = i === index;
            d.classList.toggle("is-active", active);
            d.setAttribute("aria-selected", active ? "true" : "false");
            d.tabIndex = active ? 0 : -1;
        });
    }

    // Знаходимо найближчий слайд до scrollLeft (коли свайп/скрол руками)
    function getNearestIndex() {
        const x = list.scrollLeft;
        let best = 0;
        let bestDist = Infinity;

        for (let i = 0; i < slides.length; i++) {
            const dist = Math.abs(slides[i].offsetLeft - x);
            if (dist < bestDist) {
                bestDist = dist;
                best = i;
            }
        }
        return best;
    }

    // throttle через rAF щоб не лагало при скролі
    let raf = 0;
    function onScroll() {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = 0;
            index = getNearestIndex();
            syncUI();
        });
    }

    // ---------- Events ----------
    prevBtn.addEventListener("click", () => scrollToIndex(index - 1));
    nextBtn.addEventListener("click", () => scrollToIndex(index + 1));

    dotsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".reviews__dot");
        if (!btn) return;
        scrollToIndex(Number(btn.dataset.index));
    });

    list.addEventListener("scroll", onScroll);

    window.addEventListener("resize", () => {
        // на ресайзі “підганяємо” на поточний індекс без анімації
        scrollToIndex(index, "auto");
    });

    // ---------- Старт ----------
    scrollToIndex(0, "auto");
};
