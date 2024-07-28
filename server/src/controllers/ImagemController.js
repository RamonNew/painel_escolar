import ImagemModel from "../models/ImagemModel.js";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class ImagemController {
    async index(req, res) {
        console.debug("GET :: /imagens");
        try {
            const [status, resposta] = await ImagemModel.mostrarTodos();
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao listar imagens' });
        }
    }

    async create(req, res) {
        const { alternativo } = req.body;
        const { imagem } = req.files;

        if (!alternativo || !imagem) {
            return res.status(400).json({ error: 'Os parâmetros alternativo e imagem são obrigatórios.' });
        }

        let nomeImagem = imagem.name;
        let extensao = path.extname(nomeImagem).toLowerCase();
        const extensoesPermitidas = ['.jpg', '.png'];

        if (extensoesPermitidas.includes(extensao)) {
            nomeImagem = `${Date.now()}${extensao}`;
            try {
                const [status, resposta] = await ImagemModel.inserir(imagem, alternativo, nomeImagem);
                res.status(status).json(resposta);
            } catch (error) {
                console.debug(error);
                res.status(500).json({ error: 'Erro ao inserir imagem' });
            }
        } else {
            res.status(415).json({ error: 'Tipo de arquivo não suportado' });
        }
    }

    async readPorId(req, res) {
        console.debug('Consultando imagem por ID:');
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
    }

    async atualizar(req, res) {
        console.debug('Atualizando imagem:');
        const { id } = req.params;
        const { alternativo } = req.body;
        const { imagem } = req.files;

        if (!id) {
            return res.status(400).json({ error: 'O parâmetro id é obrigatório.' });
        }

        let nomeImagem = imagem ? `${Date.now()}${path.extname(imagem.name).toLowerCase()}` : undefined;

        try {
            const [status, resposta] = await ImagemModel.atualizar(id, alternativo, nomeImagem);
            if (imagem) {
                await imagem.mv(path.join(__dirname, '../public/img/', nomeImagem));
            }
            res.status(status).json(resposta);
        } catch (error) {
            console.debug(error);
            res.status(500).json({ error: 'Erro ao atualizar imagem' });
        }
    }

    async deletar(req, res) {
        console.debug('Deletando imagem:');
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
    }

    async mostrarImagem(req, res) {
        console.debug('Servindo imagem:');
        const { nomeImagem } = req.params;
        const filePath = path.join(__dirname, '../public/img/', nomeImagem);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.debug(err);
                res.status(404).json({ error: 'Imagem não encontrada' });
            }
        });
    }
}

export default new ImagemController();