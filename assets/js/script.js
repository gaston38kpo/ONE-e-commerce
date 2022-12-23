import { valida } from "./validaciones.js";

const addBlurListener = (input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
};

const inputs = document.querySelectorAll(".input");
inputs.forEach(addBlurListener);

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("searchBar");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `./products.html?search=${searchBar.value}`;
});
