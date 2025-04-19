export const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid id');
  }
  return value;
};

export const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("a senha teve ter mais de 8 caracteres");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "A senha deve conter pelo menos um numero e caracter"
    );
  }
  return value;
};
