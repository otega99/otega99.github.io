const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");

function toggle() {
  menu.classList.toggle("open");
  menuBtn.classList.toggle("open");
}

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("scroll", window.scrollY > 0);
});
