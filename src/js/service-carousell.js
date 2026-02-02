(() => {
    const listElement = document.querySelector(".service__list");
    const prevBtn = document.querySelector('[data-action="prev"]');
    const nextBtn = document.querySelector('[data-action="next"]');

    if (!listElement) return;

    const items = [
        {
            img: "./img/digital-advertising.png",
            alt: "Digital Advertising",
            header: "Digital Marketing and Advertising",
            list: {
                p1: "Search / display / social ads;",
                p2: "Inbound marketing;",
                p3: "Search engine optimization;",
                p4: "Direct mail;",
            },
        },
        {
            img: "./img/business-planning.png",
            alt: "Business Strategy & Planning",
            header: "Business Strategy & Planning",
            list: {
                p1: "Discovery and planning;",
                p2: "Brand positioning;",
                p3: "Information architecture;",
                p4: "Content strategy.",
            },
        },
        {
            img: "./img/design-services.png",
            alt: "All Kinds of Design Services",
            header: "All Kinds of Design Services",
            list: {
                p1: "Website design;",
                p2: "Logo design an branding;",
                p3: "UI/UX design;",
                p4: "Print design.",
            },
        },
        {
            img: "./img/service-development.png",
            alt: "Web and Mobile Development",
            header: "Web and Mobile Development",
            list: {
                p1: "Responsive websites;",
                p2: "Web applications;",
                p3: "E-commerce development;",
                p4: "Custom integrations.",
            },
        },
    ];

    const createMarkup = ({ img, alt, header, list }) => `
    <li class="service__list-item">
      <div class="service__list-item-image">
        <img src="${img}" alt="${alt}">
      </div>
      <h3 class="service__list-item-title">${header}</h3>
      <ul class="service__item-list">
        <li class="service__item-point">${list.p1}</li>
        <li class="service__item-point">${list.p2}</li>
        <li class="service__item-point">${list.p3}</li>
        <li class="service__item-point">${list.p4}</li>
      </ul>
    </li>
  `;

    function perView() {
        const w = window.innerWidth;
        if (w >= 1024) return 3;
        if (w >= 768) return 2;
        return 1;
    }

    function setTransition(enabled) {
        listElement.style.transition = enabled ? "transform 250ms ease" : "none";
    }

    function getStepPx() {
        const slides = listElement.children;
        if (slides.length < 2) return 0;
        const r0 = slides[0].getBoundingClientRect();
        const r1 = slides[1].getBoundingClientRect();
        return r1.left - r0.left;
    }

    let baseCount = items.length;
    let clones = 0;
    let index = 0;
    let stepPx = 0;
    let isAnimating = false;

    function build() {

        listElement.innerHTML = items.map(createMarkup).join("");
        baseCount = items.length;
        clones = Math.min(perView(), baseCount);

        if (baseCount <= clones) {
            index = 0;
            setTransition(true);
            listElement.style.transform = "translateX(0px)";
            return;
        }

        const realSlides = Array.from(listElement.children);
        const headClones = realSlides.slice(-clones).map((node) => node.cloneNode(true));
        headClones.forEach((n) => {
            n.dataset.clone = "1";
            listElement.insertBefore(n, listElement.firstChild);
        });

        const tailClones = realSlides.slice(0, clones).map((node) => node.cloneNode(true));
        tailClones.forEach((n) => {
            n.dataset.clone = "1";
            listElement.appendChild(n);
        });

        stepPx = getStepPx();
        index = clones;


        setTransition(false);
        llistElement.style.transform = `translateX(${-index * stepPx}px)`;
        listElement.getBoundingClientRect();
        setTransition(true);
    }

    function goTo(newIndex) {
        if (isAnimating) return;
        isAnimating = true;

        index = newIndex;
        stepPx = getStepPx();
        setTransition(true);
        listElement.style.transform = `translateX(${-index * stepPx}px)`;
    }

    function next() {
        if (baseCount <= clones) return;
        goTo(index + 1);
    }

    function prev() {
        if (baseCount <= clones) return;
        goTo(index - 1);
    }

    function onTransitionEnd(e) {
        if (e.propertyName !== "transform") return;
        isAnimating = false;

        if (baseCount <= clones) return;

        const total = baseCount + clones * 2;

        if (index >= baseCount + clones) {
            index = clones;
            setTransition(false);
            listElement.style.transform = `translateX(${-index * stepPx}px)`;
            listElement.getBoundingClientRect();
            setTransition(true);
        }

        if (index < clones) {
            index = baseCount + clones - 1;
            setTransition(false);
            listElement.style.transform = `translateX(${-index * stepPx}px)`;
            listElement.getBoundingClientRect();
            setTransition(true);
        }

        void total;
    }

    nextBtn?.addEventListener("click", next);
    prevBtn?.addEventListener("click", prev);
    listElement.addEventListener("transitionend", onTransitionEnd);

    let resizeT;
    window.addEventListener("resize", () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(() => {
            build();
        }, 120);
    });

    build();
})();
