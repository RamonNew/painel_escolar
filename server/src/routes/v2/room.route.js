import express from 'express';
import { getAvailableRooms } from '../../controllers/RoomController.js';

export const roomRoute = express.Router();

roomRoute.post('/available', getAvailableRooms);