const burgerBtn = document.querySelector(".header__main-burger-menu");
const menu = document.querySelector(".header__burger-menu");

const activeBtn = () => {
    menu.classList.add("is-active");
    burgerBtn.classList.add("active");
}

const removeActiveBtn = () => {
    menu.classList.remove("is-active");
    burgerBtn.classList.remove("active");
}

burgerBtn.addEventListener("click", (event) => {
    if(event.target.nodeName !== "BUTTON") return;

    if(menu.classList.contains("is-active")) {
        removeActiveBtn();
    } else {
        activeBtn();
    }
})