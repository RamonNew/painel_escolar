import express from 'express';
import {userRoute} from './user.route.js';
import  {csvRoute}  from './csv.route.js';

export const routes = express.Router();

const defaultRoutes = [
    {
       path: '/upload-csv',
       route: csvRoute,
     },
    {
      path: '/users',
      route: userRoute,
    },
];
  
defaultRoutes.forEach((route) => {
    routes.use(route.path, route.route);
});

//export default routes;