import express from 'express';
import {signupUser,loginUser,logoutUser} from '../controllers/userController.js';

const router = express.Router();

//signup route
router.post('/signup', signupUser); 

//login route
router.post('/login', loginUser);

//logout route
router.post('/logout',logoutUser);

export default router