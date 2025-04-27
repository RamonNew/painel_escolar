import UsuarioModel from "../models/UsuarioModel.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import { configDotenv } from "dotenv";

configDotenv();

const secret = process.env.SECRET_KEY;

export const create = catchAsync(async (req, res) => {
  const { nome, usuario, senha, usuario_tipo } = req.body;

  const [status, resposta] = await UsuarioModel.inserir(
    nome,
    usuario,
    senha,
    usuario_tipo
  );

  res.status(httpStatus.CREATED).json(resposta); // 201 Created
});

export const index = catchAsync(async (req, res) => {
  console.debug("Mostrando Usuarios");
  const [status, resposta] = await UsuarioModel.mostrarTodos();
  res.status(httpStatus.OK).json(resposta); // 200 OK
});

export const show = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;
  const [status, resposta] = await UsuarioModel.mostrarUsuario(usuario_id);

  if (!resposta) {
    throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado"); // 404 Not Found
  }

  res.status(httpStatus.OK).json(resposta); // 200 OK
});

export const destroy = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;
  const [status, resposta] = await UsuarioModel.deletarUsuario(usuario_id);

  if (!resposta) {
    throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado"); // 404 Not Found
  }

  res.status(httpStatus.NO_CONTENT).send(); // 204 No Content (não retorna corpo)
});

export const logar = catchAsync(async (req, res) => {
  const { usuario, senha } = req.body;
  const [status, mensagem, usuario_id, usuario_tipo] = await UsuarioModel.verificaUsuarioSenha(usuario, senha);

  if (status === 200) {
    const token = jwt.sign({ usuario_id, usuario_tipo }, secret, { expiresIn: 14400 });
    res.status(httpStatus.OK).json({ token }); // 200 OK
  } else {
    res.status(httpStatus.UNAUTHORIZED).json({ mensagem }); // 401 Unauthorized
  }
});

export const update = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;
  const { nome, usuario, senha, usuario_tipo } = req.body;
  console.debug(senha);

  const [status, resposta] = await UsuarioModel.atualizarUsuario(
    usuario_id,
    nome,
    usuario,
    senha,
    usuario_tipo
  );

  if (!resposta) {
    throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado para atualização"); // 404 Not Found
  }

  console.debug("Usuário atualizado com sucesso");
  res.status(httpStatus.OK).json(resposta); // 200 OK
});

export const verificaToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(httpStatus.FORBIDDEN).json({ error: "Nenhum token fornecido" }); // 403 Forbidden
  }

  jwt.verify(token, secret, (erro, decoded) => {
    if (erro) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: "Falha na autenticação do token" }); // 401 Unauthorized
    } else {
      req.usuario_id = decoded.usuario_id;
      req.usuario_tipo = decoded.usuario_tipo;
      console.debug(`Id: ${decoded.usuario_id}, Tipo: ${decoded.usuario_tipo}`);
      next();
    }
  });
};
