import type { Server } from 'socket.io';
import { handleNewComment } from '../api/comment/comment.controller';

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('newComment', async (commentData) => {
      await handleNewComment(socket, commentData);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default socketHandler;
