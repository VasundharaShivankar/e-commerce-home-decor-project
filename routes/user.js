import express from 'express'
import {registerController, loginController} from '../server/controllers/userController/userController.js';

const userRoutes=express.Router()

userRoutes.post('/register', registerController);
userRoutes.post('/login',loginController);
export default userRoutes;