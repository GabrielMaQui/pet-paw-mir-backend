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
router.get('/myposts', hasRole(['USER']), getUserPostsHandler);
router.get('/user/:userId', getPostsByUserHandler);
router.get('/:id', getOnePostHandler);
router.delete('/:id', deletePostHandler);
router.post('/', hasRole(['USER']), createPostHandler);
router.patch('/:id', updatePostHandler);

export default router;

/*
localhost:3000/api/posts                GET   Get all posts       
localhost:3000/api/posts/myposts        GET   Get all posts of the authenticated user
localhost:3000/api/posts/user/:userId   GET   Get all posts of a user
localhost:3000/api/posts/:id            GET   Get a post by id
localhost:3000/api/posts                POST  Create a post
localhost:3000/api/posts/:id            PATCH Update a post
*/