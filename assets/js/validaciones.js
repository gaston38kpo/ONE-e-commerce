export function valida(input) {
  const inputType = input.dataset.type;

  if (customValidities[inputType]) {
    customValidities[inputType](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input--invalid");
    input.parentElement.querySelector(".footer__contact-me__input-box__tooltip").innerHTML = "";
  } else {
    input.parentElement.classList.add("input--invalid");
    input.parentElement.querySelector(".footer__contact-me__input-box__tooltip").innerHTML =
      showErrorMessage(inputType, input);
  }
}

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const errorMessages = {
  name: {
    valueMissing: "El campo nombre no puede estar vacío",
    patternMismatch: "El nombre no puede ser mayor a 40 caracteres.",
  },
  message: {
    valueMissing: "El campo de mensaje no puede estar vacío",
    customError: "El mensaje no puede ser mayor a 120 caracteres.",
  },
};

function showErrorMessage(inputType, input) {
  let message = "";

  errorTypes.forEach((error) => {
    if (input.validity[error]) {
      message = errorMessages[inputType][error];
    }
  });

  return message;
}

const customValidities = {
  message: (input) => validateMessage(input),
};

function validateMessage(input) {
  const nameLength = input.value.length;
  let customErrorMessage = "";

  if (nameLength >= 120) {
    customErrorMessage = "El mensaje no puede ser mayor a 120 caracteres.";
  }

  input.setCustomValidity(customErrorMessage);
}


