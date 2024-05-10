import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import {sendMessage,getMessages} from '../controllers/messageController.js';

const router = express.Router();

//Send a message
router.post('/',protectRoute,sendMessage)

//Get all messages between two users
router.get('/:otherUserId',protectRoute,getMessages)

export default router