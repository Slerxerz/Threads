import express from 'express';
import {signupUser} from '../controllers/userController.js';

const router = express.Router();

//signup route
router.post('/signup', signupUser); 

//login route
router.post('/login', (req,res)=>{});

export default router