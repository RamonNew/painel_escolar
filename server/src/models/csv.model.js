import mysql from 'mysql2/promise';
import db from '../conexao.js';

const pool = mysql.createPool(db);

export const insertCsvData = async (aulas) => {
  console.debug('Inserindo dados do CSV no banco');

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("TRUNCATE aulas");

    for (const aula of aulas) {
      const [day, month, year] = aula.Data.split('/');
      const date = `${year}-${month}-${day}`;
      const turma = aula['Turma / Tipo Reserva'];
      const instrutor = aula['Instrutor/Ambiente Reserva'];
      const inicio = aula.Inicio.substr(0, 5);
      const dataHoraInicio = `${date} ${inicio}`;
      const fim = aula.Fim.substr(aula.Fim.length - 5);
      const dataHoraFim = `${date} ${fim}`;
      const unidade = aula['Unidade Curricular / Solicitante'];
      const ambiente = aula['Ambiente Educacional / Justificativa'];

      const sql = `
        INSERT INTO aulas (data, data_hora_inicio, data_hora_fim, turma, instrutor, unidade_curricular, ambiente)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [date, dataHoraInicio, dataHoraFim, turma, instrutor, unidade, ambiente];

      await connection.query(sql, params);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao inserir dados no banco:', error);
    throw error;
  } finally {
    connection.release();
  }
};