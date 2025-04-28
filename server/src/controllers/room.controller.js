import { queryRoomsByDateAndPeriod } from "../models/room.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

export const getAvailableRooms = catchAsync(async (req, res) => {
  const { data, periodo } = req.body;

  if (!data || !periodo) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Parâmetros data e período são obrigatórios.");
  }

  const rooms = await queryRoomsByDateAndPeriod(data, periodo);

  res.status(httpStatus.OK).json(rooms);
});
