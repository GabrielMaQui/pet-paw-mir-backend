import { Router } from 'express';
import {
  createPostHandler,
  getAllPostsHandler,
  getOnePostHandler,
} from './post.controller';

const router = Router();

router.get('/', getAllPostsHandler);
router.post('/', createPostHandler);
router.get('/:id', getOnePostHandler);

export default router;
