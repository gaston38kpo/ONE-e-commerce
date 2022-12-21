export function valida(input) {
  const inputType = input.dataset.type;

  if (customValidities[inputType]) {
    customValidities[inputType](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input--invalid");
    input.parentElement.querySelector(".input-box__tooltip").innerHTML = "";
  } else {
    input.parentElement.classList.add("input--invalid");
    input.parentElement.querySelector(".input-box__tooltip").innerHTML =
      showErrorMessage(inputType, input);
  }
}

const errorTypes = [
  "badInput",
  "customError",
  "patternMismatch",
  "typeMismatch",
  "valueMissing",
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
  loginEmail: {
    valueMissing: "El campo email no puede estar vacío",
    typeMismatch: "El correo no es válido",
    patternMismatch: "El correo no es válido. Ej: mail@example.com",
  },
  loginPassword: {
    valueMissing: "El campo de la contraseña no puede estar vacío",
  },
  productURL: {
    valueMissing: "El campo de la URL no puede estar vacío",
  },
  productCategory: {
    valueMissing: "El campo de la Categoría no puede estar vacío",
  },
  productName: {
    valueMissing: "El campo del Nombre del Producto no puede estar vacío",
    patternMismatch: "El nombre no puede ser mayor a 20 caracteres.",
  },
  productPrice: {
    valueMissing: "El campo del Precio no puede estar vacío",
    badInput: "El precio solo pueden ser numeros.",
  },
  productDescription: {
    valueMissing: "El campo de la Descripcion no puede estar vacío",
    customError: "La Descripcion no puede ser mayor a 150 caracteres.",
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
  message: (input) => validateLength(input, 120),
  productDescription: (input) => validateLength(input, 150),
};

function validateLength(input, length) {
  const nameLength = input.value.length;
  let customErrorMessage = "";

  if (nameLength >= length) {
    customErrorMessage = `El mensaje no puede ser mayor a ${length} caracteres.`;
  }

  input.setCustomValidity(customErrorMessage);
}
