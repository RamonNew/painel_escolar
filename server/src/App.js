import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
const app = express()
const port = 5000

//import AmbienteController from './controllers/AmbienteController.js';
import {routes} from './routes/v2/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For parsing application/json
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('API Painel Escolar - Versão 2.0')
})

// Fazer uso do file upload
app.use(fileUpload());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//Ambientes
//app.post("/ambientes/disponiveis", AmbienteController.buscarAmbientesDisponiveis);

//
app.use('/public/',express.static(path.join(__dirname,'..','public')));

// v2 api routes
app.use('/v2', routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
});
