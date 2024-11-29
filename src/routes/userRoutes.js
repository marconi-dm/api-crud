import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const routes = express.Router();


routes.post("/auth/register", userController.register);
routes.post("/auth/login", userController.login);
routes.get("/profile", authMiddleware, userController.profile)



export default routes;