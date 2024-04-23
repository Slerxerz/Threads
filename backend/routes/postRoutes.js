import express from 'express';
import {createPost,getPost,deletePost} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';


const router = express.Router();

//create post
router.post('/create',protectRoute,createPost)

//get post
router.get('/:id',getPost)

//delete post
router.delete('/delete/:id',protectRoute,deletePost)

export default router;