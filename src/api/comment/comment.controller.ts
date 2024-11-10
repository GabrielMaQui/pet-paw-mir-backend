import type { Request, Response } from 'express';
import type { Socket } from 'socket.io';
import { createComment, fetchCommentsFromDatabase } from './comment.service';
import type { Comment } from './comment.type';

export const handleNewComment = async (
  socket: Socket,
  commentData: Comment,
) => {
  try {
    const newComment = await createComment(commentData);

    socket.broadcast.emit('commentAdded', newComment);
    return newComment;
  } catch (error) {
    console.error('Error creating comment:', error);
    socket.emit('commentError', { error: error });
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Accede al postId directamente desde req.params
  const postIdString = req.params.postId;

  // Verifica si postIdString está presente
  if (!postIdString) {
    res.status(400).json({ error: 'El post_id es requerido.' });
    return;
  }

  try {
    const postId = Number(postIdString);
    if (Number.isNaN(postId)) {
      res.status(400).json({ error: 'El post_id debe ser un número válido.' });
      return;
    }

    const comments = await fetchCommentsFromDatabase(postId);
    res.status(200).json(comments);
    return;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
    return;
  }
};
