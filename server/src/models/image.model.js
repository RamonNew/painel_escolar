import pool from "../config/db.js";

export const getAllImages = async () => {
  const sql = "SELECT * FROM anuncios";
  const [rows] = await pool.query(sql);
  return rows;
};

export const getImageById = async (id) => {
  const sql = "SELECT * FROM anuncios WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  if (rows.length === 0) {
    throw new Error("Imagem não encontrada");
  }
  return rows[0];
};

export const insertImage = async (alternativo, caminho) => {
  const sql = "INSERT INTO anuncios (alternativo, caminho) VALUES (?, ?)";
  const params = [alternativo, caminho];
  const [result] = await pool.query(sql, params);
  return { mensagem: "Imagem criada com sucesso", id: result.insertId };
};

export const updateImageById = async (id, alternativo, caminho) => {
  let updates = [];
  let params = [];

  if (alternativo) {
    updates.push("alternativo = ?");
    params.push(alternativo);
  }
  if (caminho) {
    updates.push("caminho = ?");
    params.push(caminho);
  }

  if (updates.length === 0) {
    throw new Error("Nenhum campo para atualizar");
  }

  params.push(id);
  const sql = `UPDATE anuncios SET ${updates.join(", ")} WHERE id = ?`;

  const [result] = await pool.query(sql, params);
  return { mensagem: "Imagem atualizada com sucesso" };
};

export const deleteImageById = async (id) => {
  const sqlSelect = "SELECT caminho FROM anuncios WHERE id = ?";
  const [rows] = await pool.query(sqlSelect, [id]);

  if (rows.length === 0) {
    throw new Error("Imagem não encontrada");
  }

  const sqlDelete = "DELETE FROM anuncios WHERE id = ?";
  await pool.query(sqlDelete, [id]);

  return rows[0].caminho; // Vamos retornar o caminho do arquivo para o Controller apagar fisicamente
};
