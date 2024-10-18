import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.controller';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getOnePostHandler,
  getPostsByUserHandler,
  getUserPostsHandler,
  updatePostHandler,
} from './post.controller';

const router = Router();

router.get('/', getAllPostsHandler);
router.get('/myposts', hasRole(['USER']), getAllPostsHandler);
router.get('/user/:userId', getPostsByUserHandler);
router.get('/:id', getOnePostHandler);
router.delete('/:id', deletePostHandler);
router.post('/', hasRole(['USER']), createPostHandler);
router.patch('/:id', updatePostHandler);

export default router;
