import pool from "../config/db.js";

export const queryRoomsByDateAndPeriod = async (data, periodo) => {
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

  const sql = `
    SELECT a.nome AS ambiente, 
           CASE WHEN aulas.ambiente IS NOT NULL THEN TRUE ELSE FALSE END AS ocupado
    FROM ambientes a
    LEFT JOIN aulas ON a.nome = aulas.ambiente 
    AND aulas.data_hora_inicio BETWEEN ? AND ?
    ORDER BY ocupado ASC, a.nome ASC
  `;

  const params = [dataHoraInicio, dataHoraFim];
  const [retorno] = await pool.query(sql, params);
  return retorno;
};
