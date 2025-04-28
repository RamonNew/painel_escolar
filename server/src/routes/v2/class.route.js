import express from 'express';
import {
  createClassController,
  getClasses,
  getClassesByDateAndPeriod,
  updateClass,
  updateClassKey
} from '../../controllers/class.controller.js';

export const classRoute = express.Router();

classRoute.route('/')
  .get(getClasses)
  .post(createClassController);

classRoute.post('/date-period', getClassesByDateAndPeriod);
classRoute.put('/:id', updateClass);
classRoute.put('/door-key/:id', updateClassKey);
