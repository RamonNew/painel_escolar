import AmbienteModel from "../models/AmbienteModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

// Search for available rooms by date and period
export const getAvailableRooms = catchAsync(async (req, res) => {
  const { data, periodo } = req.body;

  if (!data || !periodo) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Parâmetros data e período são obrigatórios.');
  }

  const [status, rooms] = await AmbienteModel.listarAmbientesPorDataEPeriodo(data, periodo);
  
  res.status(httpStatus.OK).json(rooms);
});
