import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll(".input");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    valida(input.target);
  });
});

const searchForm = document.getElementById("searchForm");
const searchBar = document.getElementById("searchBar");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = `./products.html?search=${searchBar.value}`
});
