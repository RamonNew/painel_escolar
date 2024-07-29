import mysql from 'mysql2/promise';
import db from '../conexao.js';

class CSVModel {
    constructor() {
        this.conexao = mysql.createPool(db);
    }

    async inserirBanco(aulas) {
        console.debug('Estou no model');
        const connection = await this.conexao.getConnection();

        try {
            await connection.beginTransaction();
            await connection.query("TRUNCATE aulas");

            for (const aula of aulas) {
                let parteData = aula.Data.split('/');
                let data = `${parteData[2]}-${parteData[1]}-${parteData[0]}`;
                let turma = aula['Turma / Tipo Reserva'];
                let instrutor = aula['Instrutor/Ambiente Reserva'];
                let inicio = aula.Inicio.substr(0, 5);
                let data_hora_inicio = `${data} ${inicio}`;
                let fim = aula.Fim.substr(aula['Fim'].length - 5);
                let data_hora_fim = `${data} ${fim}`;
                let unidade = aula['Unidade Curricular / Solicitante'];
                let ambiente = aula['Ambiente Educacional / Justificativa'];
                let sql = `INSERT INTO aulas (data, data_hora_inicio, data_hora_fim, turma, instrutor, unidade_curricular, ambiente) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;
                let params = [data, data_hora_inicio, data_hora_fim, turma, instrutor, unidade, ambiente];

                await connection.query(sql, params);
            }

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error('Erro ao inserir dados no banco:', error);
        } finally {
            connection.release();
        }
    }
}

export default new CSVModel();
