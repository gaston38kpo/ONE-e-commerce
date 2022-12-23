const listProducts = async () => {
  const response = await fetch("https://e-commerce-lz5p.onrender.com/products/");
  return await response.json();
};

const createProduct = async (url, name, description, price, category) => {
  try {
    return await fetch("https://e-commerce-lz5p.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uuid.v4(), name, description, price, url, category}),
    });
  } catch (error) {
    alert("Error: " + error);
  }
};

const readProduct = async (id) => {
  try {
    const response = await fetch(`https://e-commerce-lz5p.onrender.com/products/${id}`);
    return await response.json();
  } catch (error) {
    window.location.href = "../screens/error.html";
  }
};

const updateProduct = async (name, email, id) => {
  try {
    return await fetch(`https://e-commerce-lz5p.onrender.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
  } catch (error) {
    window.location.href = "../screens/error.html";
  }
};

const deleteProduct = async (id) => {
  try {
    return await fetch(`https://e-commerce-lz5p.onrender.com/products/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    window.location.href = "../screens/error.html";
  }
};

export const productServices = {
  listProducts,
  createProduct,
  readProduct,
  updateProduct,
  deleteProduct,
};
