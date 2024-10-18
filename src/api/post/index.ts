import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getOnePostHandler,
  updatePostHandler,
} from './post.controller';

const router = Router();

router.get('/', hasRole(["USER"]), getAllPostsHandler);
router.get('/:id', getOnePostHandler);
router.delete('/:id', deletePostHandler);
router.post('/', createPostHandler);
router.patch('/:id', updatePostHandler);

export default router;
