import express from 'express'
import {registerController, 
    loginController,
    testController
} from '../server/controllers/userController/userController.js';

import { isAdmin, requireSignIn } from "../middlewares/middlewares.js";

const userRoutes=express.Router()

userRoutes.post('/register', registerController);
userRoutes.post('/login',loginController);
userRoutes.get("/test", requireSignIn, isAdmin, testController);
export default userRoutes;