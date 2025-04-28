import {
  getAllImages,
  getImageById,
  insertImage,
  updateImageById,
  deleteImageById,
} from "../models/image.model.js";

import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import path from "path";
import fs from "fs/promises";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImages = catchAsync(async (req, res) => {
  const images = await getAllImages();
  res.status(httpStatus.OK).json(images);
});

export const createImage = catchAsync(async (req, res) => {
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!alternativo || !imagem) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Os parâmetros alternativo e imagem são obrigatórios.");
  }

  const extensao = path.extname(imagem.name).toLowerCase();
  const extensoesPermitidas = [".jpg", ".jpeg", ".png"];

  if (!extensoesPermitidas.includes(extensao)) {
    throw new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Tipo de arquivo não suportado.");
  }

  const nomeImagem = `${Date.now()}${extensao}`;

  // Salvar fisicamente
  await imagem.mv(path.join(__dirname, "../../public/img/", nomeImagem));

  const result = await insertImage(alternativo, nomeImagem);

  res.status(httpStatus.CREATED).json(result);
});

export const getImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }
  const image = await getImageById(id);
  res.status(httpStatus.OK).json(image);
});

export const updateImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  let nomeImagem;
  if (imagem) {
    nomeImagem = `${Date.now()}${path.extname(imagem.name).toLowerCase()}`;
    await imagem.mv(path.join(__dirname, "../../public/img/", nomeImagem));
  }

  const result = await updateImageById(id, alternativo, nomeImagem);
  res.status(httpStatus.OK).json(result);
});

export const deleteImage = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "O parâmetro id é obrigatório.");
  }

  const caminhoImagem = await deleteImageById(id);

  try {
    await fs.unlink(path.join(__dirname, "../../public/img/", caminhoImagem));
  } catch (err) {
    console.error("Erro ao apagar a imagem do servidor:", err);
  }

  res.status(httpStatus.NO_CONTENT).send();
});
