import csvtojsonV2 from 'csvtojson/v2/index.js';
import fs from 'fs';
import path from 'path';
import url from 'url';
import iconv from 'iconv-lite';
import CSVModel from '../models/CSVModel.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvCaminho = path.join(__dirname, '../public/csv/Consultar-Horário.csv');

const verificaArquivo = async () => {
  console.debug('Verificando existência do arquivo...');

  if (fs.existsSync(csvCaminho)) {
    try {
      console.debug('Arquivo encontrado.');
      const jsonObj = await csvtojsonV2().fromFile(csvCaminho);

      if (jsonObj && jsonObj.length > 0) {
        console.debug('Inserindo dados no banco...');
        await CSVModel.inserirBanco(jsonObj);
        removerArquivoCSV();
      }
    } catch (error) {
      console.error('Erro ao processar o arquivo CSV:', error);
    }
  }
};

const removerArquivoCSV = () => {
  fs.unlink(csvCaminho, (err) => {
    if (err) {
      console.error('Erro ao remover o arquivo CSV:', err);
    } else {
      console.log('Arquivo CSV removido com sucesso.');
    }
  });
};

export const receberUpload = async (req, res) => {
  const arquivo = req.files?.csv;

  if (!arquivo) {
    return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
  }

  const nomeArquivo = iconv.decode(Buffer.from(arquivo.name, 'binary'), 'utf-8');

  if (nomeArquivo !== 'Consultar-Horário.csv') {
    return res.status(400).json({
      error: 'O nome do arquivo deve ser exatamente "Consultar-Horário.csv"',
    });
  }

  try {
    await arquivo.mv(csvCaminho);
    console.log('Arquivo CSV salvo com sucesso:', nomeArquivo);
    await verificaArquivo();
    res.status(201).json({ message: 'Upload e processamento realizados com sucesso.' });
  } catch (error) {
    console.error('Erro no upload do arquivo CSV:', error);
    res.status(500).json({ error: 'Erro ao processar o arquivo CSV.' });
  }
};
