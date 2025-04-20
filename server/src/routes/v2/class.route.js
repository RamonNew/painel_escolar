import express from 'express';
import {
  createAula,
  readAulas,
  readAulasPorDataEPeriodo,
  atualizarAula,
  atualizarChave
} from '../../controllers/AulaController.js';

export const classRoute = express.Router();

classRoute.route('/')
  .get(readAulas)
  .post(createAula);

classRoute.post('/date-period', readAulasPorDataEPeriodo);
classRoute.put('/:id', atualizarAula);
classRoute.put('/door-key/:id', atualizarChave);
