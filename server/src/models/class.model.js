import mysql from "mysql2/promise";
import db from "../conexao.js";

const pool = mysql.createPool(db);

export const createClass = async (
  dataAula,
  horaInicio,
  horaFim,
  turma,
  instrutor,
  unidadeCurricular,
  ambiente
) => {
  const sql = `INSERT INTO aulas (data, data_hora_inicio, data_hora_fim, turma, instrutor, unidade_curricular, ambiente) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    dataAula,
    horaInicio,
    horaFim,
    turma,
    instrutor,
    unidadeCurricular,
    ambiente,
  ];
  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const queryClasses = async (dataInicio, dataFim, periodos = []) => {
  let sql = "SELECT * FROM aulas WHERE data BETWEEN ? AND ?";
  const params = [dataInicio, dataFim];

  if (periodos.length > 0) {
    sql += " AND (";
    const clauses = [];

    if (periodos.includes("manha")) {
      clauses.push(
        '(TIME(data_hora_inicio) >= "00:00:00" AND TIME(data_hora_inicio) < "12:00:00")'
      );
    }
    if (periodos.includes("tarde")) {
      clauses.push(
        '(TIME(data_hora_fim) >= "13:00:00" AND TIME(data_hora_fim) <= "18:30:00")'
      );
    }
    if (periodos.includes("noite")) {
      clauses.push(
        '(TIME(data_hora_inicio) >= "18:00:00" AND TIME(data_hora_inicio) < "23:59:59")'
      );
    }

    sql += clauses.join(" OR ");
    sql += ")";
  }

  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const queryClassByDateAndPeriod = async (dataInicio, dataFim, periodos = [], turma = "") => {
  let sql = "SELECT * FROM aulas WHERE data BETWEEN ? AND ?";
  const params = [dataInicio, dataFim];

  if (periodos.length > 0) {
    sql += " AND (";
    const clauses = [];

    if (periodos.includes("manha")) {
      clauses.push(
        '(TIME(data_hora_inicio) >= "00:00:00" AND TIME(data_hora_inicio) < "12:00:00")'
      );
    }
    if (periodos.includes("tarde")) {
      clauses.push(
        '(TIME(data_hora_fim) >= "13:00:00" AND TIME(data_hora_fim) <= "18:30:00")'
      );
    }
    if (periodos.includes("noite")) {
      clauses.push(
        '(TIME(data_hora_inicio) >= "18:00:00" AND TIME(data_hora_inicio) < "23:59:59")'
      );
    }

    sql += clauses.join(" OR ");
    sql += ")";
  }

  if (turma) {
    sql += " AND turma LIKE ?";
    params.push(`%${turma}%`);
  }

  sql += " ORDER BY data_hora_inicio, instrutor";

  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const updateClassById = async (id, instrutor, unidade_curricular, ambiente) => {
  let sql = "UPDATE aulas SET ";
  const updates = [];
  const params = [];

  if (instrutor) {
    updates.push("instrutor = ?");
    params.push(instrutor.toUpperCase());
  }
  if (unidade_curricular) {
    updates.push("unidade_curricular = ?");
    params.push(unidade_curricular.toUpperCase());
  }
  if (ambiente) {
    updates.push("ambiente = ?");
    params.push(ambiente.toUpperCase());
  }

  if (updates.length === 0) {
    throw new Error("Nenhum campo para atualizar");
  }

  sql += updates.join(", ") + " WHERE id = ?";
  params.push(id);

  const [retorno] = await pool.query(sql, params);
  return retorno;
};

export const updateClassKeyById = async (id, chave) => {
  const sql = "UPDATE aulas SET chave = ? WHERE id = ?";
  const params = [chave, id];

  const [retorno] = await pool.query(sql, params);
  return retorno;
};
