import bcrypt from "bcryptjs";
import httpStatus from 'http-status';
import { getUserByUsuario as getUserByUsuarioModel } from "../models/user.model.js";


export const loginUserWithUsuarioAndPassword = async (usuario, senha) => {
  try {
    const user = await getUserByUsuarioModel(usuario);

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Usuário ou senha incorretos"
      );
    }

    const { usuario_id, nome, usuario_tipo } = user;
    return { usuario_id, nome, usuario_tipo };
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      error.message || "Erro ao autenticar usuário"
    );
  }
};
