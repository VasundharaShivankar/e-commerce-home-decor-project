import express from 'express'
import {registerUser} from './../server/controllers/userController/userController.js';

const router=express.Router()

router.post('/register',registerUser)

export default router;