import express from "express";
import { create, destroy, index, show, update } from "../../controllers/UsuarioController.js";

export const userRoute = express.Router();

userRoute.route("/")
    .get(index)
    .post(create);

userRoute.route("/:usuario_id")
    .get(show)
    .put(update)
    .delete(destroy);
    
export default userRoute;
