import csvtojsonV2 from "csvtojson/v2/index.js";
import fs from "fs";
import path from "path";
import url from "url";
import iconv from "iconv-lite";
import { insertCsvData } from "../models/csv.model.js"; // IMPORT CORRIGIDO
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "../../public/csv/Consultar-Horário.csv");

const checkFile = async () => {
  console.debug("Verificando existência do arquivo CSV...");

  if (fs.existsSync(csvPath)) {
    const jsonObj = await csvtojsonV2().fromFile(csvPath);

    if (jsonObj && jsonObj.length > 0) {
      console.debug("Inserindo dados do CSV no banco de dados...");
      await insertCsvData(jsonObj); // <<< AJUSTADO AQUI
      removeCsvFile();
    }
  }
};

const removeCsvFile = () => {
  fs.unlink(csvPath, (err) => {
    if (err) {
      console.error("Erro ao remover o arquivo CSV:", err);
    } else {
      console.log("Arquivo CSV removido com sucesso.");
    }
  });
};

export const uploadCsv = catchAsync(async (req, res) => {
  const file = req.files?.csv;

  if (!file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nenhum arquivo foi enviado.");
  }

  const fileName = iconv.decode(Buffer.from(file.name, "binary"), "utf-8");

  if (fileName !== "Consultar-Horário.csv") {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'O nome do arquivo deve ser exatamente "Consultar-Horário.csv".'
    );
  }

  await file.mv(csvPath);
  console.log("Arquivo CSV salvo com sucesso:", fileName);

  await checkFile();

  res
    .status(httpStatus.CREATED)
    .json({ message: "Upload e processamento realizados com sucesso." });
});
