import express from 'express';
import {
  create,
  list,
  getById,
  update,
  remove,
  login,
} from '../../controllers/user.controller.js';
import { createUsuario } from '../../validations/user.validation.js';
import validate from '../../middlewares/validate.js';

export const userRoute = express.Router();

userRoute.route('/')
  .get(list)
  .post(validate(createUsuario), create);

userRoute.route('/:usuario_id')
  .get(getById)
  .put(update)
  .delete(remove);

userRoute.route('/logar')
  .post(login);
