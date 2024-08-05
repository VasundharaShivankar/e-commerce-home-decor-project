import express from 'express'
import {registerController} from '../server/controllers/userController/userController.js';

const userRoutes=express.Router()

userRoutes.post('/register', registerController)

export default userRoutes;