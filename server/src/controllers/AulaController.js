import AulaModel from "../models/AulaModel.js";

class AulaController {

    // Método para criar uma nova aula
    async createAula(req, res) {
        console.debug('Criando nova aula:');
        const { dataAula, horaInicio, horaFim, turma, instrutor, unidadeCurricular, ambiente } = req.body;

        // Verifica se os parâmetros obrigatórios estão presentes
        if (!dataAula || !horaInicio || !horaFim || !turma || !instrutor || !unidadeCurricular || !ambiente) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Concatenar a data com a hora de início e a hora de fim
        const dataHoraInicio = `${dataAula} ${horaInicio}`;
        const dataHoraFim = `${dataAula} ${horaFim}`;

        console.log(dataHoraInicio);
        console.log(dataHoraFim);

        try {
            const [status, resposta] = await AulaModel.createAula(
                dataAula,  // data original, caso ainda precise
                dataHoraInicio,
                dataHoraFim,
                turma,
                instrutor,
                unidadeCurricular,
                ambiente
            );
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao criar aula.' });
        }
    }

    async readAulas(req, res) {
        console.debug('Consultando aulas:');
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então adicionamos 1
        const dia = String(agora.getDate()).padStart(2, '0');
        const hora = agora.getHours();
        const minutos = agora.getMinutes();
        const periodos = [];

        if (hora < 12 || (hora === 12 && minutos <= 30)) {
            periodos.push('manha');
        } else if (hora < 18) {
            periodos.push('tarde');
        } else {
            periodos.push('noite');
        }

        const data = `${ano}-${mes}-${dia}`;
        try {
            const [status, resposta] = await AulaModel.mostrarAulas(data, data, periodos);
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao consultar aulas' });
        }
    }

    async readAulasPorDataEPeriodo(req, res) {
        console.debug('Consultando aulas por data e período informados:');

        const { dataInicio, dataFim, periodos, turma } = req.body;

        // Verifica se os parâmetros obrigatórios estão presentes
        if (!dataInicio || !dataFim) {
            return res.status(400).json({ error: 'Parâmetros dataInicio e dataFim são obrigatórios.' });
        }

        try {
            // Chama o modelo passando os parâmetros opcionais
            const [status, resposta] = await AulaModel.mostrarAulas(dataInicio, dataFim, periodos || [], turma || '');
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao consultar aulas' });
        }
    }

    async atualizarAula(req, res) {
        console.debug('Atualizando aula:');
        const { id } = req.params;
        const { instrutor, unidade_curricular, ambiente } = req.body;

        // Verifica se o parâmetro id está presente
        if (!id) {
            return res.status(400).json({ error: 'O parâmetro id é obrigatório.' });
        }

        try {
            const [status, resposta] = await AulaModel.atualizarAula(id, instrutor, unidade_curricular, ambiente);
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao atualizar aula' });
        }
    }

    async atualizarChave(req, res) {
        console.debug('Atualizando chave da aula:');
        const { id } = req.params;
        const { chave } = req.body;

        // Verifica se os parâmetros id e chave estão presentes
        if (!id || chave === undefined) {
            return res.status(400).json({ error: 'Os parâmetros id e chave são obrigatórios.' });
        }

        try {
            const [status, resposta] = await AulaModel.atualizarChave(id, chave);
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao atualizar chave da aula' });
        }
    }
}

export default new AulaController();
