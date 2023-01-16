import { productServices } from "../services/product-service.js";

const currentUrl = new URL(window.location);
const id = currentUrl.searchParams.get("id");

if (id == null) {
  alert(
    "Ah ocurrido un error, no se ah seleccionado ningún producto, vuelva a intentarlo"
  );
  window.location.href = "./products.html";
}

const setProductInfo = async (id) => {
  try {
    const { name, description, price, url, category } =
      await productServices.readProduct(id);
    if (name && description && price && url && category) {
      document.getElementById("product-name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("product-price").value = price;
      document.getElementById("url").value = url;
      document.getElementById("category").value = category;
    } else {
      throw new Error();
    }
  } catch (error) {
    alert(
      "Ah ocurrido un error, no se ah seleccionado ningún producto, vuelva a intentarlo"
    );
    window.location.href = "./products.html";
  }
};

setProductInfo(id);

const form = document.querySelector(".add-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("product-name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("product-price").value;
  const url = document.getElementById("url").value;
  const category = document.getElementById("category").value;

  try {
    await productServices.updateProduct(
      id,
      name,
      description,
      price,
      url,
      category
    );
    confirm("El producto ah sido modificado con exitosamente!")
    window.location.href = `./product-info.html?id=${id}`;
  } catch (error) {
    alert("Error: " + error);
  }
});
