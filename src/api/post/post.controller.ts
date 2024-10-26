import type { Pet } from '@prisma/client';
import { NextFunction, type Request, type Response } from 'express';
import JSONbig from 'json-bigint';
import { PostService } from './post.service';
import type { Post } from './post.type';

const postService = new PostService();

export async function getAllPostsHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const posts = await postService.getAllPosts();
  res.json({ data: posts });
}

export async function createPostWithPetHandler(
  req: Request,
  res: Response,
): Promise<void> {
  const postData = req.body as Omit<
    Post,
    'id' | 'created_at' | 'updated_at' | 'pet_id'
  > & {
    petData: Omit<Pet, 'id' | 'created_at' | 'updated_at' | 'owner_id'>;
    userId: string;
  };

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
    const post = await postService.getOnePostById(Number(id));
    if (post) {
      res.json({ data: post });
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
  const { postData } = req.body as { postData: Partial<Post> };
  try {
    const updatedPost = await postService.updatePostById(Number(id), postData);
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json({ data: updatedPost });
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
    const post = await postService.deletePostById(Number(id));
    if (post) {
      res.status(200).json({ data: post });
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
    res.json({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}
