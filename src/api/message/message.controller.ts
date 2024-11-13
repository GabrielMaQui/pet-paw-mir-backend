import type { Request, Response } from 'express';
import * as messageService from './message.service';

export const createMessage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { chat_id, sender_id, receiver_id, content } = req.body;

  if (!chat_id || !sender_id || !receiver_id || !content) {
    res.status(400).json({
      message:
        'Datos incompletos: se requieren chat_id, sender_id, receiver_id y content',
    });
    return;
  }

  try {
    const message = await messageService.createMessage(
      chat_id,
      sender_id,
      receiver_id,
      content,
    );
    res.status(201).json(message);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Ocurrió un error desconocido' });
    }
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const messages = await messageService.getMessagesByChatId(Number(id));
    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({
        message: 'No se encontraron mensajes para el chat especificado',
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Ocurrió un error desconocido' });
    }
  }
};
