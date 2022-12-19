const listUsers = async () => {
  const response = await fetch("../db.json");
  const data = await response.json();
  return data.users;
};

export const userServices = {
  listUsers,
};
