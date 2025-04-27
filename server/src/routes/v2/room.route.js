import express from 'express';
import { getAvailableRooms } from '../../controllers/room.controller.js';

export const roomRoute = express.Router();

roomRoute.post('/available', getAvailableRooms);