import express from "express";
import { create, destroy, index, show, update } from "../../controllers/UsuarioController.js";
import { createUsuario } from "../../validations/user.validation.js";
import validate from "../../middlewares/validate.js";

export const userRoute = express.Router();

userRoute.route("/")
    .get(index)
    .post(validate(createUsuario),create);

userRoute.route("/:usuario_id")
    .get(show)
    .put(update)
    .delete(destroy);
    
//export default userRoute;
