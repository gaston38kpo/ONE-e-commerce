const listProducts = async () => {
  const response = await fetch(
    "https://e-commerce-lz5p.onrender.com/products/"
  );
  return await response.json();
};

const createProduct = async (url, name, description, price, category) => {
  try {
    return await fetch("https://e-commerce-lz5p.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uuid.v4(),
        name,
        description,
        price,
        url,
        category,
      }),
    });
  } catch (error) {
    alert("Error: " + error);
  }
};

const readProduct = async (id) => {
  try {
    const response = await fetch(
      `https://e-commerce-lz5p.onrender.com/products/${id}`
    );
    if (!response.ok) {
      throw new Error("Producto no encontrado");
    }
    return await response.json();
  } catch (error) {
    alert("Ah ocurrido un error, vuelva a intentarlo.");
  }
};

const updateProduct = async (id, name, description, price, url, category) => {
  try {
    return await fetch(`https://e-commerce-lz5p.onrender.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, url, category }),
    });
  } catch (error) {
    alert("Ah ocurrido un error, vuelva a intentarlo.");
  }
};

const deleteProduct = async (id) => {
  try {
    return await fetch(`https://e-commerce-lz5p.onrender.com/products/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Ah ocurrido un error, vuelva a intentarlo.");
  }
};

export const productServices = {
  listProducts,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
};
