import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const createUser = async (userBody) => {
  const { nome, usuario, senha, usuario_tipo } = userBody;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);
  const sql =
    "INSERT INTO usuarios (nome, usuario, senha, usuario_tipo) VALUES (?, ?, ?, ?)";
  const params = [nome, usuario, hash, usuario_tipo];
  try {
    const [retorno] = await pool.query(sql, params);
    if (!retorno.insertId) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Falha ao criar usuário"
      );
    }
    return {
      usuario_id: retorno.insertId,
      nome,
      usuario,
      usuario_tipo,
    };
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Erro ao inserir usuário"
    );
  }
};

export const getUsers = async () => {
  const sql =
    "SELECT usuario_id, nome, usuario, usuario_tipo FROM painel_db.usuarios;";
  try {
    const [rows] = await pool.query(sql);
    if (!rows.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "Nenhum usuário encontrado");
    }
    return rows;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Erro ao buscar usuários"
    );
  }
};

export const getUserById = async (usuario_id) => {
  const sql =
    "SELECT nome, usuario, usuario_tipo FROM usuarios WHERE usuario_id = ?";
  try {
    const [rows] = await pool.query(sql, [usuario_id]);
    if (!rows.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");
    }
    return rows[0];
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message || "Erro ao buscar usuário"
    );
  }
};

export const updateUserById = async (usuario_id, userBody) => {
  try {
    const { senha, ...userWithoutPassword } = userBody; 

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);

    const sql = "UPDATE usuarios SET nome = ?, usuario = ?, senha = ?, usuario_tipo = ? WHERE usuario_id = ?";
    const params = [userWithoutPassword.nome, userWithoutPassword.usuario, hash, userWithoutPassword.usuario_tipo, usuario_id];

    const [retorno] = await pool.query(sql, params);

    if (!retorno.affectedRows) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Usuário não encontrado ou não atualizado');
    }

    return { usuario_id, ...userWithoutPassword }; 
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || 'Erro ao atualizar usuário');
  }
};

export const deleteUserById = async (usuario_id) => {
  try {
    const sql = "DELETE FROM usuarios WHERE usuario_id = ?";
    const [retorno] = await pool.query(sql, [usuario_id]);

    if (retorno.affectedRows === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");
    }

    return { message: "Usuário deletado com sucesso", usuario_id };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Erro ao deletar usuário");
  }
};
export const verifyUserCredentials = async (usuario, senha) => {
  const sql = "SELECT * FROM usuarios WHERE usuario = ?";
  const [rows] = await pool.query(sql, [usuario]);
  if (rows.length === 0) {
    return null;
  }
  const valid = bcrypt.compareSync(senha, rows[0].senha);
  if (!valid) {
    return null;
  }
  const { usuario_id, usuario_tipo } = rows[0];
  return { usuario_id, usuario_tipo };
};

export const checkIfUserInUse = async (userBody) => {
  const userName = userBody.usuario;
  const sql = "SELECT usuario FROM usuarios WHERE usuario = ?";
  const [rows] = await pool.query(sql, userName);
  if (rows.length === 0) {
    return false;
  }
  return true;
};

export const getUserByUsuario = async (usuario) => {
  try {
    const sql = "SELECT usuario_id, nome, usuario, senha, usuario_tipo FROM usuarios WHERE usuario = ?";
    const [rows] = await pool.query(sql, [usuario]);

    if (!rows.length) {
      throw new ApiError(httpStatus.NOT_FOUND, "Usuário não encontrado");
    }

    return rows[0];
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message || "Erro ao buscar usuário por nome de usuário");
  }
};