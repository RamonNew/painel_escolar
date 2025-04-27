import AulaModel from "../models/AulaModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

export const createClass = catchAsync(async (req, res) => {
  const { dataAula, horaInicio, horaFim, turma, instrutor, unidadeCurricular, ambiente } = req.body;

  if (!dataAula || !horaInicio || !horaFim || !turma || !instrutor || !unidadeCurricular || !ambiente) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Todos os campos são obrigatórios.");
  }

  const dataHoraInicio = `${dataAula} ${horaInicio}`;
  const dataHoraFim = `${dataAula} ${horaFim}`;

  const [status, resposta] = await AulaModel.createAula(
    dataAula,
    dataHoraInicio,
    dataHoraFim,
    turma,
    instrutor,
    unidadeCurricular,
    ambiente
  );
  res.status(httpStatus.CREATED).json(resposta);
});

export const readClasses = catchAsync(async (req, res) => {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  const hora = agora.getHours();
  const minutos = agora.getMinutes();

  const periodos = [];
  if (hora < 12 || (hora === 12 && minutos <= 30)) {
    periodos.push("manha");
  } else if (hora < 18) {
    periodos.push("tarde");
  } else {
    periodos.push("noite");
  }

  const data = `${ano}-${mes}-${dia}`;

  const [status, resposta] = await AulaModel.mostrarAulas(data, data, periodos);
  res.status(httpStatus.OK).json(resposta);
});

export const readClassesByDateAndPeriod = catchAsync(async (req, res) => {
  const { dataInicio, dataFim, periodos, turma } = req.body;

  if (!dataInicio || !dataFim) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Parâmetros dataInicio e dataFim são obrigatórios.");
  }

  const [status, resposta] = await AulaModel.mostrarAulas(dataInicio, dataFim, periodos || [], turma || "");
  res.status(httpStatus.OK).json(resposta);
});

export const updateClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { instrutor, unidade_curricular, ambiente } = req.body;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const [status, resposta] = await AulaModel.atualizarAula(id, instrutor, unidade_curricular, ambiente);
  res.status(httpStatus.OK).json(resposta);
});

export const updateKey = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { chave } = req.body;

  if (!id || chave === undefined) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Os parâmetros id e chave são obrigatórios.");
  }

  const [status, resposta] = await AulaModel.atualizarChave(id, chave);
  res.status(httpStatus.OK).json(resposta);
});
