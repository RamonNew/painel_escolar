import express from 'express';
import { login as loginController } from "../../controllers/auth.controller.js";

export const authRoute = express.Router();

authRoute.post('/login', loginController);