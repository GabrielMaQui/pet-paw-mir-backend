import express from 'express';
import { hasRole } from '../../auth/auth.controller.js';
import * as chatController from './chat.controller.js';

const router = express.Router();

router.post('/', hasRole(['USER']), chatController.createChat);
router.get('/user/:id', hasRole(['USER']), chatController.getChatsByUserId);
router.get(
  '/:owner_id/:friend_id',
  hasRole(['USER']),
  chatController.getOneChat,
);

export default router;
