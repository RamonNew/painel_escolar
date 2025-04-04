import AmbienteModel from "../models/AmbienteModel.js";

class AmbienteController {
  async buscarAmbientesDisponiveis(req, res) {
    const { data, periodo } = req.body;

    // Verificar se os parâmetros obrigatórios estão presentes
    if (!data || !periodo) {
      return res.status(400).json({ error: 'Parâmetros data e período são obrigatórios.' });
    }

    try {
      const [status, ambientes] = await AmbienteModel.listarAmbientesPorDataEPeriodo(data, periodo);
      return res.status(status).json(ambientes);
    } catch (error) {
      console.error('Erro ao buscar ambientes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

export default new AmbienteController();
