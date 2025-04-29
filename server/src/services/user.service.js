import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import {
  checkIfUserInUse as checkIfUserInUseModel,
  createUser as createUserModel,
  getUsers as getUsersModel,
  getUserById as getUserByIdModel,
  updateUserById as updateUserByIdModel,
  deleteUserById as deleteUserByIdModel,
} from "../models/user.model.js";

export const createUser = async (userBody) => {
  if (await checkIfUserInUseModel(userBody)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Usuário já existe");
  }
  return createUserModel(userBody);
};

export const queryUsers = async () => {
  return getUsersModel();
};

export const getUserById = async (usuario_id) => {
  return getUserByIdModel(usuario_id);
};

export const updateUserById = async (usuario_id, userBody) => {
  return updateUserByIdModel(usuario_id, userBody);
};

export const deleteUserById = async (usuario_id) => {
  return deleteUserByIdModel(usuario_id);
};
