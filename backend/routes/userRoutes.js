import express from 'express';
import {signupUser,loginUser,logoutUser,followUnfollowUser,updateUser,userProfile} from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

//User Profile route
router.get('/profile/:username', userProfile);

//signup route
router.post('/signup', signupUser); 

//login route
router.post('/login', loginUser);

//logout route
router.post('/logout',logoutUser);

//follow route
router.get('/follow/:id', protectRoute, followUnfollowUser);

//update route
router.put('/update/:id', protectRoute, updateUser);


export default router