import { productServices } from "../services/product-service.js";

const form = document.querySelector(".add-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("product-price").value;
  const url = document.getElementById("url").value;
  const category = document.getElementById("category").value;

  try {
    await productServices.createProduct(
      name,
      description,
      price,
      url,
      category
    );
    window.location.href = "../../../products.html"
  } catch (error) {
    alert("Error: " + error);
  }
});
