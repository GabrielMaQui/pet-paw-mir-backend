import express from 'express';
import * as chatController from './chat.controller.js';

const router = express.Router();

router.post('/', chatController.createChat);
router.get('/user/:id', chatController.getChatsByUserId);
router.get('/:owner_id/:friend_id', chatController.getOneChat);

export default router;
