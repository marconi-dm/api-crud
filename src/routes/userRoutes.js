import express from 'express';
import userController from '../controllers/userController.js';


const routes = express.Router();


routes.post("/auth/register", userController.register);
routes.post("/auth/login", userController.login);



export default routes;