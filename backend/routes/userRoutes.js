import express from 'express';
import {signupUser,loginUser,logoutUser,followUnfollowUser} from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

//signup route
router.post('/signup', signupUser); 

//login route
router.post('/login', loginUser);

//logout route
router.post('/logout',logoutUser);

//follow route
router.get('/follow/:id', protectRoute, followUnfollowUser);

export default router