import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  verifyUserCredentials,
} from '../models/user.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { createUser as createUserService } from '../services/user.service.js';

const secret = process.env.SECRET_KEY;

// export const create = catchAsync(async (req, res) => {
//   const { nome, usuario, senha, usuario_tipo } = req.body;

//   const user = await createUser(nome, usuario, senha, usuario_tipo);
//   res.status(httpStatus.CREATED).json(user);
// });

export const create = catchAsync(async (req, res) => {
  //const { nome, usuario, senha, usuario_tipo } = req.body;

  const user = await createUserService(req.body);
  res.status(httpStatus.CREATED).json(user);
});

export const list = catchAsync(async (req, res) => {
  const users = await getAllUsers();
  res.status(httpStatus.OK).json(users);
});

export const getById = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;

  const user = await getUserById(usuario_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuário não encontrado');
  }

  res.status(httpStatus.OK).json(user);
});

export const update = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;
  const { nome, usuario, senha, usuario_tipo } = req.body;

  const result = await updateUserById(usuario_id, nome, usuario, senha, usuario_tipo);
  if (result.affectedRows === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuário não encontrado para atualização');
  }

  res.status(httpStatus.OK).json({ message: 'Usuário atualizado com sucesso' });
});

export const remove = catchAsync(async (req, res) => {
  const { usuario_id } = req.params;

  const result = await deleteUserById(usuario_id);
  if (result.affectedRows === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuário não encontrado para exclusão');
  }

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
