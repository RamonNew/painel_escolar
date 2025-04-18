import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
const app = express()
const port = 5000

import AulaController from './controllers/AulaController.js';
import ImagemController from './controllers/ImagemController.js';
//import * as CSVController from './controllers/CSVController.js';
import * as UsuarioController from './controllers/UsuarioController.js';
import AmbienteController from './controllers/AmbienteController.js';
import {routes} from './routes/v2/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

// For parsing application/json
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Painel Escolar - Versão 2.0')
})


// Comando que permite acessar diretório com arquivos estáticos
app.use(express.static("public"));

// Fazer uso do file upload
app.use(fileUpload());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


//CRUD Professor
app.get("/aulas", AulaController.readAulas);
app.post("/aulas",AulaController.createAula);
app.put('/aulas/:id', AulaController.atualizarAula);
app.post('/aulas/data-periodo', AulaController.readAulasPorDataEPeriodo);
app.put('/chave/:id', AulaController.atualizarChave);


// CRUD Imagens
app.get("/imagens", ImagemController.index);
app.post("/imagens", ImagemController.create);
app.get("/imagens/:id", ImagemController.readPorId);
app.put("/imagens/:id", ImagemController.atualizar);
app.delete("/imagens/:id", ImagemController.deletar);

// CRUD Usuários
app.post("/logar", UsuarioController.logar);


//Ambientes
app.post("/ambientes/disponiveis", AmbienteController.buscarAmbientesDisponiveis);


// Rota para servir as imagens
app.get("/public/:nomeImagem", ImagemController.mostrarImagem);

// v2 api routes
app.use('/v2', routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
});
