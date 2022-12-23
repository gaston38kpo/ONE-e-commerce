import { userServices } from "../services/user-service.js";

const verifyCredentials = async (loginEmail, loginPassword) => {
  try {
    const users = await userServices.listUsers();
    
    for (const user of users) {      
      if (loginEmail == user.email && loginPassword == user.password) {
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
    alert("Las credenciales no son válidas.(email: usuario1@ejemplo.com, password: usuario1)");
  }
});
