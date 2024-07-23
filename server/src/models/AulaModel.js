import mysql from 'mysql2/promise';
import db from '../conexao.js';

class AulaModel{
    constructor(){
        this.conexao = mysql.createPool(db);
    }

    async mostrarAulas(dataInicio, dataFim, periodos) {
        let sql = 'SELECT * FROM aulas WHERE data BETWEEN ? AND ?';
        const params = [dataInicio, dataFim];

        if (periodos.length > 0) {
            sql += ' AND (';
            const periodoClauses = [];

            if (periodos.includes('manha')) {
                periodoClauses.push('(TIME(data_hora_inicio) >= "06:00:00" AND TIME(data_hora_inicio) < "12:00:00")');
            }
            if (periodos.includes('tarde')) {
                periodoClauses.push('(TIME(data_hora_fim) >= "13:00:00" AND TIME(data_hora_fim) <= "18:30:00")');
            }
            if (periodos.includes('noite')) {
                periodoClauses.push('(TIME(data_hora_inicio) >= "18:00:00" AND TIME(data_hora_inicio) < "23:59:59")');
            }

            sql += periodoClauses.join(' OR ');
            sql += ')';
        }

        try {
            const [retorno] = await this.conexao.query(sql, params);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async atualizarAula(id, instrutor, unidade_curricular, ambiente) {
        let sql = 'UPDATE aulas SET ';
        const updates = [];
        const params = [];
    
        if (instrutor) {
            updates.push('instrutor = ?');
            params.push(instrutor);
        }
        if (unidade_curricular) {
            updates.push('unidade_curricular = ?');
            params.push(unidade_curricular);
        }
        if (ambiente) {
            updates.push('ambiente = ?');
            params.push(ambiente);
        }
    
        if (updates.length === 0) {
            return [400, 'Nenhum campo para atualizar'];
        }
    
        sql += updates.join(', ') + ' WHERE id = ?';
        params.push(id);
    
        try {
            const [retorno] = await this.conexao.query(sql, params);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async atualizarChave(id, chave) {
        const sql = 'UPDATE aulas SET chave = ? WHERE id = ?';
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

// const aula = new AulaModel();
// console.log( await aula.mostrarAulas('2024-07-19','2024-07-19',['noite','manha']));

export default new AulaModel();