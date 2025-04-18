import express from 'express';
import userRoute from './user.route.js';

export const routes = express.Router();

const defaultRoutes = [
    // {
    //   path: '/auth',
    //   route: authRoute,
    // },
    {
      path: '/users',
      route: userRoute,
    },
];
  
defaultRoutes.forEach((route) => {
    routes.use(route.path, route.route);
});

export default routes;