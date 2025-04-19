import express from "express";
import { userRoute } from "./user.route.js";
import { csvRoute } from "./csv.route.js";
import { imageRoute } from "./image.route.js";

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
  },
];

defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});

//export default routes;
