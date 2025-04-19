import express from "express";
import validate from "../../middlewares/validate.js";
import { receberUpload } from "../../controllers/CSVController.js";

export const csvRoute = express.Router();

csvRoute.route("/")
    .post(receberUpload);

//export default csvRoute;