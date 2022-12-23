const listUsers = async () => {
  const response = await fetch("https://e-commerce-lz5p.onrender.com/users/");
  return await response.json();
};

export const userServices = {
  listUsers,
};

