import mysql from "mysql2/promise";
import db from "../conexao.js";
import bcrypt from "bcryptjs";

const pool = mysql.createPool(db);

export const getUserById = async (usuario_id) => {
  const sql = "SELECT * FROM usuarios WHERE usuario_id = ?";
  const [rows] = await pool.query(sql, [usuario_id]);
  return rows.length ? rows[0] : null;
};

export const getAllUsers = async () => {
  const sql = "SELECT * FROM usuarios";
  const [rows] = await pool.query(sql);
  return rows;
};

export const createUser = async (nome, usuario, senha, usuario_tipo) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);
  const sql = "INSERT INTO usuarios (nome, usuario, senha, usuario_tipo) VALUES (?, ?, ?, ?)";
  const params = [nome, usuario, hash, usuario_tipo];
  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const updateUserById = async (usuario_id, nome, usuario, senha, usuario_tipo) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);
  const sql = "UPDATE usuarios SET nome = ?, usuario = ?, senha = ?, usuario_tipo = ? WHERE usuario_id = ?";
  const params = [nome, usuario, hash, usuario_tipo, usuario_id];
  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const deleteUserById = async (usuario_id) => {
  const sql = "DELETE FROM usuarios WHERE usuario_id = ?";
  const [retorno] = await pool.query(sql, [usuario_id]);
  return retorno;
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
