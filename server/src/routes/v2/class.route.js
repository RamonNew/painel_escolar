import express from 'express';
import {
  createClass,
  readClasses,
  readClassesByDateAndPeriod,
  updateClass,
  updateKey
} from '../../controllers/class.controller.js';

export const classRoute = express.Router();

classRoute.route('/')
  .get(readClasses)
  .post(createClass);

classRoute.post('/date-period', readClassesByDateAndPeriod);
classRoute.put('/:id', updateClass);
classRoute.put('/door-key/:id', updateKey);
