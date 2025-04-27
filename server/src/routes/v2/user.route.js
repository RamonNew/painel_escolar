import express from "express";
import {
  create,
  destroy,
  index,
  logar,
  show,
  update,
} from "../../controllers/user.controller.js";
import { createUsuario } from "../../validations/user.validation.js";
import validate from "../../middlewares/validate.js";

export const userRoute = express.Router();

userRoute.route("/").get(index).post(validate(createUsuario), create);

userRoute.route("/:usuario_id").get(show).put(update).delete(destroy);

userRoute.route("/logar").post(logar);
