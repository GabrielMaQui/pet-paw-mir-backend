import type { Pet } from '@prisma/client';
import { NextFunction, type Request, type Response } from 'express';
import JSONbig from 'json-bigint';
import type { AuthRequest } from '../../auth/auth.types';
import { PostService } from './post.service';
import type { CreatePostWithPetInput, Post } from './post.type';

const postService = new PostService();

export async function getAllPostsHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const posts = await postService.getAllPosts();
    const sanitizedPosts = convertBigIntAndDateToString(posts);
    res.json({ data: sanitizedPosts });
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the posts' });
  }
}

export async function createPostWithPetHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const postData = req.body as CreatePostWithPetInput;
  try {
    const newPost = await postService.createPostWithPet(postData);
    const responseData = JSONbig.stringify({ data: newPost });
    res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .send(responseData);
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
    const postId = Number.parseInt(id);

    if (Number.isNaN(postId)) {
      res.status(400).json({ message: 'Invalid post ID' });
      return;
    }

    console.log(postId);

    const post = await postService.getOnePostById(postId);

    if (post) {
      const sanitizedPost = convertBigIntAndDateToString(post);
      res.json({ data: sanitizedPost });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the post' });
  }
}

export async function updatePostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;
  const { postData } = req.body as { postData: Partial<Post> };

  try {
    const postId = Number.parseInt(id, 10);

    if (Number.isNaN(postId)) {
      res.status(400).json({ message: 'Invalid post ID' });
      return;
    }

    const updatedPost = await postService.updatePostById(postId, postData);

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const sanitizedPost = convertBigIntAndDateToString(updatedPost);
    res.json({ data: sanitizedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while updating the post' });
  }
}

export async function deletePostHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const { id } = req.params;

  try {
    const postId = Number.parseInt(id, 10);

    if (Number.isNaN(postId)) {
      res.status(400).json({ message: 'Invalid post ID' });
      return;
    }

    const post = await postService.deletePostById(postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const sanitizedPost = convertBigIntAndDateToString(post);
    res.status(200).json({ data: sanitizedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the post' });
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
    console.error('Error fetching posts by user:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the posts' });
  }
}

export async function getPostsByTokenHandler(
  req: AuthRequest,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'No user ID found in request' });
      return;
    }

    const posts = await postService.getPostsByUser(userId);
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener posts del usuario:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function convertBigIntAndDateToString(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertBigIntAndDateToString);
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[key] = convertBigIntAndDateToString(
          (obj as Record<string, unknown>)[key],
        );
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }

  return obj;
}
