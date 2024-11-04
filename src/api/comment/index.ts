import { Router } from 'express';
import { hasRole } from '../../auth/auth.controller';
import { getCommentsByPost } from './comment.controller';

const router = Router();

router.get('/:postId', hasRole(['USER']), getCommentsByPost);

export default router;
