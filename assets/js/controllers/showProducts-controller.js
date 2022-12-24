import { productServices } from "../services/product-service.js";
import { utils } from "../utils.js";

const isUserLogged = await utils.checkSessionUserID();

const createNewCard = (id, name, description, price, url, category) => {
  const card = document.createElement("div");
  card.classList.add("card");

  let newCard = `
  <img 
      class="card__img" 
      src="${url}" 
      alt="${utils.capwords(name)}" 
      loading="lazy" 
      title="${description}" />  
  <h3 class="card__title" title="${category}">${utils.capwords(name)}</h3>
  <span class="card__price">$ ${price}</span>
  <span class="card__id">#${id}</span>`;

  if (isUserLogged) {
    newCard = newCard + `
    <a class="card__icon card__icon--trash" id="deleteBtn" data-id="${id}" href="#">
        <img loading="lazy" src="assets/img/trash-icon.svg" alt="icono de papelera" />
    </a>
    <a class="card__icon card__icon--pencil" href="./add-product.html?id=${id}">
        <img loading="lazy" src="assets/img/pencil-icon.svg" alt="icono de lápiz" />
    </a>`;

    card.innerHTML = newCard;

    const deleteBtn = card.querySelector("#deleteBtn");

    deleteBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      const id = deleteBtn.dataset.id;

      try {
        await productServices.deleteProduct(id);
      } catch (error) {
        alert(`Ah ocurrido un error: ${error}`);
      }
    });

    return card;
  }
  card.innerHTML = newCard;

  return card;
};

const productGrid = document.querySelector("#productGrid");
const url = new URL(window.location);
const categoryFilter = url.searchParams.get("category");
const searchFilter = url.searchParams.get("search");

try {
  const listProducts = await productServices.listProducts();

  listProducts.forEach(({ id, name, description, price, url, category }) => {
    if (
      (!categoryFilter ||
        categoryFilter.toLowerCase() == category.toLowerCase()) &&
      (!searchFilter ||
        id.includes(searchFilter) ||
        name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        price.includes(searchFilter) ||
        category.toLowerCase().includes(searchFilter.toLowerCase()))
    ) {
      const newCard = createNewCard(
        id,
        name,
        description,
        price,
        url,
        category
      );
      
      productGrid.appendChild(newCard);
    }
  });
} catch (error) {
  alert("Ocurrió un error: " + error);
}

const addBtn = document.getElementById("addProductBtn");

addBtn.href = isUserLogged ? "./add-product.html" : "./login.html";
