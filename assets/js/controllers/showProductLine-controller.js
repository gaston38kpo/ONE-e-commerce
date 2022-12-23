import { productServices } from "../services/product-service.js";

const capwords = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const createNewCard = (id, name, description, price, url, category) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
  <img src="${url}" 
      alt="${capwords(name)}"
      class="card__img" 
      loading="lazy" 
      title="${description}" />
        <h3 class="card__title" title="${capwords(name)}">${capwords(name)}</h3>
        <span class="card__price">$ ${price}</span>
        <a href="./product-info.html?id=${id}" class="link">Ver Producto</a>
 `;

  return card;
};

const productLine = document.querySelectorAll("#productLine");

try {
  const listProducts = await productServices.listProducts();

  productLine.forEach((line) => {
    let LIMIT_OF_PRODUCTS_PER_LINE = 12;
    let productCounter = 0;
    
    listProducts.every(({ id, name, description, price, url, category }) => {
      if (line.dataset.category.toLowerCase() == category.toLowerCase()) {
        const newCard = createNewCard(
          id,
          name,
          description,
          price,
          url,
          category
        );
        line.appendChild(newCard);
        productCounter++;

        return productCounter < LIMIT_OF_PRODUCTS_PER_LINE;
      }
      return true;
    });
  });
} catch (error) {
  alert("Ocurrio un error: " + error);
}
