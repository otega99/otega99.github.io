const header = document.querySelector("header");
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
const formTitle = document.querySelector(".form-title");
const formInputs = document.querySelector(".form-inputs");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("open");
  navigation.classList.toggle("open");
});

window.addEventListener("scroll", function () {
  header.classList.toggle("light", window.scrollY > 0);
});

function login() {
  formTitle.classList.remove("open");
  formInputs.classList.remove("open");
}
function register() {
  formTitle.classList.add("open");
  formInputs.classList.add("open");
}
