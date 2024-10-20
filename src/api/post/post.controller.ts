import { NextFunction, type Request, type Response } from 'express';
import { verifyToken } from '../../auth/auth.service';
import type { PayloadType } from '../../auth/auth.types';
import { PostService } from './post.service';
import type { Post } from './post.type';

const postService = new PostService();

export async function getAllPostsHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const posts = await postService.getAllPosts();
  res.json(posts);
}

export async function createPostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const data = req.body as Post;
  const token = req.headers?.authorization?.split(' ')[1];

  if (token) {
    const decoded = verifyToken(token) as PayloadType;
    console.log(decoded.id);
    data.user_id = decoded.id;
  }

  try {
    const newPost = await postService.createPost(data);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

export async function getOnePostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  try {
    const post = await postService.getOnePostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

export async function updatePostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const data = req.body as Post;
  try {
    const updatedPost = await postService.updatePostById(id, data);
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

export async function deletePostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  try {
    const post = await postService.deletePostById(id);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

export async function getPostsByUserHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { userId } = req.params;
  try {
    const posts = await postService.getPostsByUser(userId);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

export async function getUserPostsHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const token = req.headers?.authorization?.split(' ')[1];
  console.log(token);

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const decoded = verifyToken(token) as PayloadType;

  console.log(decoded);

  try {
    const posts = await postService.getPostsByUser(decoded.id);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
