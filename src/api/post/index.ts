import { Router } from 'express';
import {
  createPostHandler,
  deletePostHandler,
  getAllPostsHandler,
  getOnePostHandler,
  updatePostHandler,
} from './post.controller';

const router = Router();

router.get('/', getAllPostsHandler);
router.get('/:id', getOnePostHandler);
router.delete('/:id', deletePostHandler);
router.post('/', createPostHandler);
router.patch('/:id', updatePostHandler);

export default router;
