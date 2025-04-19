import ImagemModel from '../models/ImagemModel.js';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET /imagens
export const index = async (req, res) => {
  console.debug('GET :: /imagens');
  try {
    const [status, resposta] = await ImagemModel.mostrarTodos();
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: 'Erro ao listar imagens' });
  }
};

// POST /imagens
export const create = async (req, res) => {
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!alternativo || !imagem) {
    return res.status(400).json({ mensagem: 'Os parâmetros alternativo e imagem são obrigatórios.' });
  }

  let nomeImagem = imagem.name;
  const extensao = path.extname(nomeImagem).toLowerCase();
  const extensoesPermitidas = ['.jpg', '.png','.jpeg'];

  if (!extensoesPermitidas.includes(extensao)) {
    return res.status(415).json({ error: 'Tipo de arquivo não suportado' });
  }

  nomeImagem = `${Date.now()}${extensao}`;

  try {
    const [status, resposta] = await ImagemModel.inserir(imagem, alternativo, nomeImagem);
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: 'Erro ao inserir imagem' });
  }
};

// GET /imagens/:id
export const readPorId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'O parâmetro id é obrigatório.' });
  }

  try {
    const [status, resposta] = await ImagemModel.mostrarPorId(id);
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: 'Erro ao consultar imagem' });
  }
};

// PUT /imagens/:id
export const atualizar = async (req, res) => {
  const { id } = req.params;
  const { alternativo } = req.body;
  const { imagem } = req.files || {};

  if (!id) {
    return res.status(400).json({ error: 'O parâmetro id é obrigatório.' });
  }

  const nomeImagem = imagem ? `${Date.now()}${path.extname(imagem.name).toLowerCase()}` : undefined;

  try {
    const [status, resposta] = await ImagemModel.atualizar(id, alternativo, nomeImagem);
    if (imagem) {
      await imagem.mv(path.join(__dirname, '../../public/img/', nomeImagem));
    }
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: 'Erro ao atualizar imagem' });
  }
};

// DELETE /imagens/:id
export const deletar = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'O parâmetro id é obrigatório.' });
  }

  try {
    const [status, resposta] = await ImagemModel.deletar(id);
    res.status(status).json(resposta);
  } catch (error) {
    console.debug(error);
    res.status(500).json({ error: 'Erro ao deletar imagem' });
  }
};

// // GET /imagens/mostrar/:nomeImagem
// export const mostrarImagem = async (req, res) => {
//   const { nomeImagem } = req.params;
//   const filePath = path.join(__dirname, '../public/img/', nomeImagem);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.debug(err);
//       res.status(404).json({ error: 'Imagem não encontrada' });
//     }
//   });
// };
