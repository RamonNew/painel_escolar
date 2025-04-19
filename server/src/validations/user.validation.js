import joi from "joi";

export const createUsuario = {
  body: joi.object().keys({
    nome: joi.string().min(3).required().messages({
      "string.base": "O nome deve ser uma string",
      "string.empty": "O nome é obrigatório",
      "string.min": "O nome deve ter pelo menos 3 caracteres",
      "any.required": "O nome é obrigatório",
    }),
    usuario: joi.string().required().messages({
      "string.base": "O usuário deve ser uma string",
      "string.empty": "O usuário é obrigatório",
      "any.required": "O usuário é obrigatório",
    }),
    senha: joi.string().min(6).required().messages({
      "string.base": "A senha deve ser uma string",
      "string.empty": "A senha é obrigatória",
      "string.min": "A senha deve ter no mínimo 6 caracteres",
      "any.required": "A senha é obrigatória",
    }),
    usuario_tipo: joi.string().valid("A", "U").required().messages({
      "string.empty": "O tipo de usuário é obrigatório",
      "any.only": "Tipo de usuário inválido",
      "any.required": "O tipo de usuário é obrigatório",
    }),
  }),
};
