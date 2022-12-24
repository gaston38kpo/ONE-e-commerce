import { userServices } from "../services/user-service.js";
import { utils } from "../utils.js";

const isUserAlreadyLogged = await utils.checkSessionUserID();

if (isUserAlreadyLogged) {
  alert("Usted ya ah iniciado sesión, sera redireccionado automáticamente.");
  window.location.href = "./products.html";
}

const verifyCredentials = async (loginEmail, loginPassword) => {
  try {
    const users = await userServices.listUsers();

    for (const user of users) {
      if (loginEmail == user.email && loginPassword == user.password) {
        sessionStorage.setItem("userID", JSON.stringify(user.id));
        return true;
      }
    }
  } catch (error) {
    alert("Ah ocurrido un error. Vuelva a intentarlo por favor.");
  }
  return false;
};

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const loginEmail = loginForm.email.value;
  const loginPassword = loginForm.password.value;

  const isValidUser = await verifyCredentials(loginEmail, loginPassword);

  if (isValidUser) {
    window.location.href = "./products.html";
  } else {
    alert(
      "Las credenciales no son válidas.(email: usuario1@ejemplo.com, password: usuario1)"
    );
  }
});
