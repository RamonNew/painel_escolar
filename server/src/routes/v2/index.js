import express from "express";
import { userRoute } from "./user.route.js";
import { csvRoute } from "./csv.route.js";
import { imageRoute } from "./image.route.js";
import { classRoute } from "./class.route.js";
import { roomRoute } from './room.route.js';

export const routes = express.Router();

const defaultRoutes = [
  {
    path: "/upload-csv",
    route: csvRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/images",
    route: imageRoute,
  },{
    path: "/classes",
    route: classRoute,
  },{
    path: '/rooms',
    route: roomRoute,
  },
];

defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});
