import {
  createClass,
  queryClasses,
  queryClassByDateAndPeriod,
  updateClassById,
  updateClassKeyById,
} from "../models/class.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

export const createClassController = catchAsync(async (req, res) => {
  const { dataAula, horaInicio, horaFim, turma, instrutor, unidadeCurricular, ambiente } = req.body;

  if (!dataAula || !horaInicio || !horaFim || !turma || !instrutor || !unidadeCurricular || !ambiente) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Todos os campos são obrigatórios.");
  }

  const dataHoraInicio = `${dataAula} ${horaInicio}`;
  const dataHoraFim = `${dataAula} ${horaFim}`;

  const aula = await createClass(
    dataAula,
    dataHoraInicio,
    dataHoraFim,
    turma,
    instrutor,
    unidadeCurricular,
    ambiente
  );

  res.status(httpStatus.CREATED).json(aula);
});

export const getClasses = catchAsync(async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const periods = [];
  if (hour < 12 || (hour === 12 && minutes <= 30)) {
    periods.push("manha");
  } else if (hour < 18) {
    periods.push("tarde");
  } else {
    periods.push("noite");
  }

  const today = `${year}-${month}-${day}`;

  const aulas = await queryClasses(today, today, periods);
  res.status(httpStatus.OK).json(aulas);
});

export const getClassesByDateAndPeriod = catchAsync(async (req, res) => {
  const { dataInicio, dataFim, periodos, turma } = req.body;

  if (!dataInicio || !dataFim) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Parâmetros dataInicio e dataFim são obrigatórios.");
  }

  const aulas = await queryClassByDateAndPeriod(dataInicio, dataFim, periodos || [], turma || "");
  res.status(httpStatus.OK).json(aulas);
});

export const updateClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { instrutor, unidade_curricular, ambiente } = req.body;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const aulaAtualizada = await updateClassById(id, instrutor, unidade_curricular, ambiente);
  res.status(httpStatus.OK).json(aulaAtualizada);
});

export const updateClassKey = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { chave } = req.body;

  if (!id || chave === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Os parâmetros id e chave são obrigatórios.");
  }

  const chaveAtualizada = await updateClassKeyById(id, chave);
  res.status(httpStatus.OK).json(chaveAtualizada);
});
