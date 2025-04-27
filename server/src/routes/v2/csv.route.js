import express from "express";
import validate from "../../middlewares/validate.js";
import { uploadCsv } from "../../controllers/csv.controller.js";

export const csvRoute = express.Router();

csvRoute.route("/")
    .post(uploadCsv);

//export default csvRoute;