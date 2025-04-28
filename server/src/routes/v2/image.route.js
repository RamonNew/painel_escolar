import express from 'express';
import {
  getImages,
  createImage,
  getImage,
  updateImage,
  deleteImage,
} from '../../controllers/image.controller.js';

export const imageRoute = express.Router();

imageRoute.route('/')
  .get(getImages)
  .post(createImage);

imageRoute.route('/:id')
  .get(getImage)
  .put(updateImage)
  .delete(deleteImage);