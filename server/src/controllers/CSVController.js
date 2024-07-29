import csvtojsonV2 from 'csvtojson/v2/index.js';
import fs from 'fs';
import path from 'path';
import url from 'url';
import iconv from 'iconv-lite';
import CSVModel from '../models/CSVModel.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvCaminho = path.join(__dirname, "../public/csv/Consultar-Horário.csv");

class CSVController {
    constructor() {
        // Bind the methods to ensure 'this' context
        this.verificaArquivo = this.verificaArquivo.bind(this);
        this.removerArquivoCSV = this.removerArquivoCSV.bind(this);
        this.receberUpload = this.receberUpload.bind(this);
    }

    async verificaArquivo() {
        console.debug('Verifica arquivo');
        if (fs.existsSync(csvCaminho)) {
            try {
                console.debug('arquivo existe');
                const jsonObj = await csvtojsonV2().fromFile(csvCaminho);
                this.aulas = jsonObj;
            } catch (error) {
                console.error('Erro ao ler o arquivo CSV:', error);
            }
        }

        if (this.aulas) {
            console.debug('Insere banco');
            await CSVModel.inserirBanco(this.aulas);
            this.removerArquivoCSV();
        }
    }

    removerArquivoCSV() {
        fs.unlink(csvCaminho, (err) => {
            if (err) {
                console.error('Erro ao remover o arquivo CSV:', err);
            } else {
                console.log('Arquivo CSV removido com sucesso.');
            }
        });
    }

    async receberUpload(req, res) {
        const arquivo = req.files.csv;

        // Convertendo o nome do arquivo para UTF-8
        const nomeArquivo = iconv.decode(Buffer.from(arquivo.name, 'binary'), 'utf-8');

        // Verificação do nome do arquivo
        if (nomeArquivo !== 'Consultar-Horário.csv') {
            return res.status(400).json({ error: 'O nome do arquivo deve ser exatamente "Consultar-Horário.csv"' });
        }

        try {
            await arquivo.mv(csvCaminho);
            console.log('Arquivo CSV enviado com sucesso:', nomeArquivo);
            await this.verificaArquivo();  // Certifique-se de que `this` refere-se à instância correta
            res.status(201).json({ message: 'Upload bem-sucedido e arquivo processado' });
        } catch (erro) {
            console.error('Erro ao enviar o arquivo CSV:', erro);
            res.status(400).json({ error: erro.message });
        }
    }
}

export default new CSVController();
