import express from 'express';
import fileUpload from 'express-fileupload';
const app = express()
const port = 5000

import AulaController from './controllers/AulaController.js';
import ImagemController from './controllers/ImagemController.js';
import CSVController from './controllers/CSVController.js';
import UsuarioController from './controllers/UsuarioController.js';
import AmbienteController from './controllers/AmbienteController.js';

// For parsing application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
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

// Rota para upload e processamento de CSV
app.post("/upload-csv", CSVController.receberUpload);

// CRUD Usuários
app.get("/usuarios", UsuarioController.index);
app.get("/usuarios/:usuario_id", UsuarioController.show);
app.post("/usuarios", UsuarioController.create);
app.put("/usuarios/:usuario_id", UsuarioController.update);
app.delete("/usuarios/:usuario_id", UsuarioController.destroy);
app.post("/logar", UsuarioController.logar);


//Ambientes
app.post("/ambientes/disponiveis", AmbienteController.buscarAmbientesDisponiveis);


// Rota para servir as imagens
app.get("/public/:nomeImagem", ImagemController.mostrarImagem);
//CRUD Turma
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
