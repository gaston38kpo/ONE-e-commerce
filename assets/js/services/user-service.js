const listUsers = async () => {
  const response = await fetch("http://localhost:3000/users/");
  return await response.json();
};

export const userServices = {
  listUsers,
};

