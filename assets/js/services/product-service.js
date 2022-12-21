const listProducts = async () => {
  const response = await fetch("http://localhost:3000/products/");
  return await response.json();
};

const createProduct = async (name, description, price, url, category) => {
  try {
    return await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, url, category, id: uuid.v4() }),
    });
  } catch (error) {
    alert("Error: " + error);
  }
};

const readProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    return await response.json();
  } catch (error) {
    window.location.href = "../screens/error.html";
  }
};

const updateProduct = async (name, email, id) => {
  try {
    return await fetch(`http://localhost:3000/products/${id}`, {
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
    return await fetch(`http://localhost:3000/products/${id}`, {
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
