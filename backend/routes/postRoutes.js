import express from 'express';
import {createPost,getPost,deletePost,likeUnlikePost,replyPost,getFeedPosts} from '../controllers/postController.js';
import protectRoute from '../middlewares/protectRoute.js';


const router = express.Router();

//get feed
router.get('/feed', protectRoute,getFeedPosts)

//get post
router.get('/:id',getPost)

//create post
router.post('/create',protectRoute,createPost)

//delete post
router.delete('/delete/:id',protectRoute,deletePost)

// like and unlike post
router.put('/like/:id',protectRoute,likeUnlikePost)

//reply post
router.put('/reply/:id',protectRoute,replyPost)

export default router;