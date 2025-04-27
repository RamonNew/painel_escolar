import ImagemModel from "../models/ImagemModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const index = catchAsync(async (req, res) => {
  const [status, resposta] = await ImagemModel.mostrarTodos();
  res.status(status || httpStatus.OK).json(resposta);
});

export const create = catchAsync(async (req, res) => {
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!alternativo || !imagem) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Os parâmetros alternativo e imagem são obrigatórios."
    );
  }

  const extensao = path.extname(imagem.name).toLowerCase();
  const extensoesPermitidas = [".jpg", ".png", ".jpeg"];

  if (!extensoesPermitidas.includes(extensao)) {
    throw new ApiError(
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      "Tipo de arquivo não suportado."
    );
  }

  const nomeImagem = `${Date.now()}${extensao}`;

  const [status, resposta] = await ImagemModel.inserir(
    imagem,
    alternativo,
    nomeImagem
  );
  res.status(status || httpStatus.CREATED).json(resposta);
});

export const readPorId = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const [status, resposta] = await ImagemModel.mostrarPorId(id);
  res.status(status || httpStatus.OK).json(resposta);
});

export const atualizar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const nomeImagem = imagem
    ? `${Date.now()}${path.extname(imagem.name).toLowerCase()}`
    : undefined;

  const [status, resposta] = await ImagemModel.atualizar(
    id,
    alternativo,
    nomeImagem
  );
  if (imagem) {
    await imagem.mv(path.join(__dirname, "../../public/img/", nomeImagem));
  }
  res.status(status || httpStatus.OK).json(resposta);
});

export const deletar = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const [status] = await ImagemModel.deletar(id);
  res.status(status || httpStatus.NO_CONTENT).send();
});
