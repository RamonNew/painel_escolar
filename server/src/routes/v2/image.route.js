import express from 'express';
import {
  index,
  create,
  readPorId,
  atualizar,
  deletar,
 // mostrarImagem
} from '../../controllers/image.controller.js';

export const imageRoute = express.Router();

imageRoute.route('/')
  .get(index)
  .post(create);

imageRoute.route('/:id')
  .get(readPorId)
  .put(atualizar)
  .delete(deletar);

// Rota separada para exibir a imagem
//imageRoute.get('/mostrar/:nomeImagem', mostrarImagem);
