const listUsers = async () => {
  const response = await fetch("http://127.0.0.1:3000/users/");
  // const response = await fetch("https://e-commerce-lz5p.onrender.com/users/");
  return await response.json();
};

const readUser = async (id) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/users/${id}`
      // `https://e-commerce-lz5p.onrender.com/users/${id}`
    );
    return await response.json();
  } catch (error) {
    alert(`Ah ocurrido un error, vuelva a intentarlo. ${error}`);
    window.location.href = "./login.html";
  }
};

export const userServices = {
  listUsers,
  readUser,
};
