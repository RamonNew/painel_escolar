import AmbienteModel from "../models/AmbienteModel.js";

// Search for available rooms by date and period
export const getAvailableRooms = async (req, res) => {
  const { data, periodo } = req.body;

  if (!data || !periodo) {
    return res.status(400).json({ error: 'Parâmetros data e período são obrigatórios.' });
  }

  try {
    const [status, rooms] = await AmbienteModel.listarAmbientesPorDataEPeriodo(data, periodo);
    return res.status(status).json(rooms);
  } catch (error) {
    console.error('Erro ao buscar ambientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};