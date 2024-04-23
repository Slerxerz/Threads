import express from 'express';
import {signupUser,loginUser,logoutUser,followUnfollowUser,updateUser} from '../controllers/userController.js';
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

//update route
router.post('/update/:id', protectRoute, updateUser);

export default router