import { userServices } from "./services/user-service.js";

const capwords = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

const checkSessionUserID = async () => {
  const userIdSession = JSON.parse(sessionStorage.getItem("userID"));
  const userDb = await userServices.readUser(userIdSession);

  if (userIdSession == null || userDb.id == undefined) {
    return false;
  }

  return userIdSession == userDb.id;
};

export const utils = {
  capwords,
  checkSessionUserID,
};
