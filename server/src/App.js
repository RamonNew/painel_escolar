import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import url from 'url';

import { routes } from './routes/v2/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware: Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware: Enable CORS and file uploads
app.use(cors());
app.use(fileUpload());

// Middleware: HTTP request logging (Morgan - success requests)
app.use(successHandler);

// Static files: Serve public directory
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API Painel Escolar - Version 2.0');
});

// API routes (v2)
app.use('/v2', routes);

// Middleware: HTTP error logging (Morgan - error requests)
app.use(morganErrorHandler);

// Middleware: Convert and handle errors
app.use(errorConverter);
app.use(errorHandler);

export default app;
