import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { checkIfUserInUse, insertUser as createUserModel } from "../models/user.model.js";

export const createUser = async (userBody) => {
  if (await checkIfUserInUse(userBody)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Usuário já existe");
  }
  return createUserModel(userBody);
};
