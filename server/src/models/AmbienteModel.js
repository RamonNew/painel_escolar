import mysql from "mysql2/promise";
import db from "../conexao.js";

class AmbienteModel {
  constructor() {
    this.conexao = mysql.createPool(db);
  }

  // Método para listar ambientes disponíveis ou ocupados por data e período
  async listarAmbientesPorDataEPeriodo(data, periodo) {
    // Definir as faixas de horário para o período
    let horaInicio, horaFim;

    switch (periodo) {
      case 'manha':
        horaInicio = '00:00:00';
        horaFim = '12:00:00';
        break;
      case 'tarde':
        horaInicio = '12:00:00';
        horaFim = '18:00:00';
        break;
      case 'noite':
        horaInicio = '18:00:00';
        horaFim = '23:59:59';
        break;
      default:
        throw new Error('Período inválido');
    }

    const dataHoraInicio = `${data} ${horaInicio}`;
    const dataHoraFim = `${data} ${horaFim}`;

    // Consulta SQL para verificar os ambientes ocupados no período
    const sql = `
      SELECT a.nome AS ambiente, 
             CASE WHEN aulas.ambiente IS NOT NULL THEN TRUE ELSE FALSE END AS ocupado
      FROM ambientes a
      LEFT JOIN aulas ON a.nome = aulas.ambiente 
      AND aulas.data_hora_inicio BETWEEN ? AND ?
      ORDER BY ocupado ASC, a.nome ASC
    `;

    const params = [dataHoraInicio, dataHoraFim];

    try {
      const [retorno] = await this.conexao.query(sql, params);
      console.log('Ambientes retornados:', retorno); // Depuração: verificar retorno no console
      return [200, retorno];
    } catch (error) {
      console.debug('Erro ao consultar ambientes disponíveis:', error);
      return [400, { error: 'Erro ao consultar ambientes disponíveis' }];
    }
  }
}

export default new AmbienteModel();
