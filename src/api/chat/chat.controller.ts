import type { Request, Response } from 'express';
import * as chatService from './chat.service.js';

export const createChat = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { owner_id, friend_id } = req.body;
  try {
    const existingChat = await chatService.findChat(owner_id, friend_id);
    if (existingChat) {
      res.status(200).json(existingChat);
      return;
    }

    const newChat = await chatService.createChat(owner_id, friend_id);
    res.status(201).json(newChat);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getChatsByUserId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const chats = await chatService.getChatsByUserId(id);
    res.status(200).json(chats);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export const getOneChat = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { owner_id, friend_id } = req.params;
  try {
    const chat = await chatService.findChat(owner_id, friend_id);
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: 'Chat no encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
