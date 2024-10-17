import exp from 'node:constants';
import { NextFunction, type Request, type Response } from 'express';
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
