import { catchAsync } from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import {
  createUser as createUserService,
  queryUsers as queryUsersService,
  getUserById as getUserByIdService,
  updateUserById as updateUserByIdService,
  deleteUserById as deleteUserByIdService,
} from '../services/user.service.js';
import { verifyUserCredentials } from '../models/user.model.js'; // continua vindo direto do model

const secret = process.env.SECRET_KEY;

export const create = catchAsync(async (req, res) => {
  const user = await createUserService(req.body);
  res.status(httpStatus.CREATED).json(user);
});

export const list = catchAsync(async (req, res) => {
  const users = await queryUsersService();
  res.status(httpStatus.OK).json(users);
});

export const getById = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;

  const user = await getUserByIdService(usuario_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }

  res.status(httpStatus.OK).json(user);
});

export const update = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;

  const user = await updateUserByIdService(usuario_id, req.body);
  res.status(httpStatus.OK).json({ message: 'Usuário atualizado com sucesso', user });
});

export const remove = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;

  await deleteUserByIdService(usuario_id);
  res.status(httpStatus.NO_CONTENT).send();
});

export const login = catchAsync(async (req, res) => {
  const { usuario, senha } = req.body;

  const user = await verifyUserCredentials(usuario, senha);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Usuário ou senha inválidos');
  }

  const token = jwt.sign(
    { usuario_id: user.usuario_id, usuario_tipo: user.usuario_tipo },
    secret,
    { expiresIn: '4h' }
  );

  res.status(httpStatus.OK).json({ token });
});
