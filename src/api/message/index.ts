import express from 'express';
import { hasRole } from '../../auth/auth.controller';
import { createMessage, getMessages } from './message.controller';

const router = express.Router();

router.post('/messages', hasRole(['USER']), createMessage);
router.get('/messages/:id', hasRole(['USER']), getMessages);

export default router;
