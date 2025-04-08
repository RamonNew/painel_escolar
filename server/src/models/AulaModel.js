import mysql from "mysql2/promise";
import db from "../conexao.js";

class AulaModel {
  constructor() {
    this.conexao = mysql.createPool(db);
  }

  async createAula(
    dataAula,
    horaInicio,
    horaFim,
    turma,
    instrutor,
    unidadeCurricular,
    ambiente
  ) {
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
    console.debug(params);
    try {
      const [retorno] = await this.conexao.query(sql, params);
      return [200, retorno];
    } catch (error) {
      console.debug(error);
      return [400, error];
    }
  }

  async mostrarAulas(dataInicio, dataFim, periodos = [], turma = "") {
    let sql = "SELECT * FROM aulas WHERE data BETWEEN ? AND ?";
    const params = [dataInicio, dataFim];

    if (periodos.length > 0) {
      sql += " AND (";
      const periodoClauses = [];

      if (periodos.includes("manha")) {
        periodoClauses.push(
          '(TIME(data_hora_inicio) >= "00:00:00" AND TIME(data_hora_inicio) < "12:00:00")'
        );
      }
      if (periodos.includes("tarde")) {
        periodoClauses.push(
          '(TIME(data_hora_fim) >= "13:00:00" AND TIME(data_hora_fim) <= "18:30:00")'
        );
      }
      if (periodos.includes("noite")) {
        periodoClauses.push(
          '(TIME(data_hora_inicio) >= "18:00:00" AND TIME(data_hora_inicio) < "23:59:59")'
        );
      }

      sql += periodoClauses.join(" OR ");
      sql += ")";
    }

    if (turma) {
      sql += " AND turma LIKE ?";
      params.push(`%${turma}%`);
    }

    sql += " ORDER BY data_hora_inicio, instrutor";

    try {
      const [retorno] = await this.conexao.query(sql, params);
      return [200, retorno];
    } catch (error) {
      console.debug(error);
      return [400, error];
    }
  }

  async atualizarAula(id, instrutor, unidade_curricular, ambiente) {
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
      return [400, "Nenhum campo para atualizar"];
    }

    sql += updates.join(", ") + " WHERE id = ?";
    params.push(id);

    try {
      const [retorno] = await this.conexao.query(sql, params);
      return [200, {mensagem:"Aula atualizada"}];
    } catch (error) {
      console.debug(error);
      return [400, error];
    }
  }

  async atualizarChave(id, chave) {
    const sql = "UPDATE aulas SET chave = ? WHERE id = ?";
    const params = [chave, id];

    try {
      const [retorno] = await this.conexao.query(sql, params);
      return [200, retorno];
    } catch (error) {
      console.debug(error);
      return [400, error];
    }
  }
}

export default new AulaModel();
