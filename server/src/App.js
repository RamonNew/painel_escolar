import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import url from 'url';

import { routes } from './routes/v2/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan.js';

const app = express();
const port = 5000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(successHandler);

// Middleware: parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware: enable CORS and file uploads
app.use(cors());
app.use(fileUpload());

// Static files: serve public folder
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Health check route
app.get('/', (req, res) => {
  res.send('API Painel Escolar - Versão 2.0');
});

// API routes (v2)
app.use('/v2', routes);

app.use(morganErrorHandler);

// Error handling
app.use(errorConverter);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
