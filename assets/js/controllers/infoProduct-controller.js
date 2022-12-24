import { productServices } from "../services/product-service.js";
import { utils } from "../utils.js";

const isUserLogged = await utils.checkSessionUserID();

const createInfoCard = (name, description, price, url, category) => {
  const productInfoContainer = document.querySelector("#productInfo");
  const productLineContainer = document.querySelector("#productLine");
  productLineContainer.dataset.category = category;

  const img = document.createElement("img");
  img.src = url;
  img.alt = utils.capwords(name);
  img.classList.add("product-info__img");

  productInfoContainer.appendChild(img);
  const div = document.createElement("div");
  div.classList.add("product-info__info");

  const h2 = document.createElement("h2");
  h2.classList.add("product-info__info__title");
  h2.title = category;
  h2.innerHTML = utils.capwords(name);
  div.appendChild(h2);

  const h3 = document.createElement("h3");
  h3.classList.add("product-info__info__price");
  h3.innerHTML = `$ ${price}`;
  div.appendChild(h3);

  const p = document.createElement("p");
  p.classList.add("product-info__info__details");
  p.innerHTML = description;
  div.appendChild(p);

  productInfoContainer.appendChild(div);
};

const generateScriptList = () => {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "./assets/js/controllers/showProductLine-controller.js";

  document.body.appendChild(script);
};

const url = new URL(window.location);
const idFilter = url.searchParams.get("id");

try {
  const { name, description, price, url, category } =
    await productServices.readProduct(idFilter);

  createInfoCard(name, description, price, url, category);
  const showCategoryBtn = document.getElementById("showCategoryBtn");
  showCategoryBtn.href = `./products.html?category=${category}`;

  generateScriptList();
} catch (error) {
  alert("Ocurrió un error: " + error);
}

const addBtn = document.getElementById("adminBtn");

addBtn.href = isUserLogged ? "./add-product.html" : "./login.html";
