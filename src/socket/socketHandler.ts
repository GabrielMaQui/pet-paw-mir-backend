import { PrismaClient } from '@prisma/client';
import type { Server } from 'socket.io';

const prisma = new PrismaClient();

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Registro del usuario usando su User.id
    socket.on('register', async (userId) => {
      // Comprobamos si el usuario existe en la base de datos
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        await prisma.user.update({
          where: { id: userId },
          data: { socketId: socket.id },
        });
        socket.emit('login');
      } else {
        // Si el usuario no existe, emitir un error o crear uno nuevo
        socket.emit('userNotFound', 'El usuario no existe.');
        console.log('Usuario no encontrado.');
      }

      // Emitir la lista de usuarios activos
      const activeUsers = await prisma.user.findMany({
        where: { socketId: { not: null } },
      });
      io.emit('activeSessions', activeUsers);
    });

    // Desconexión y actualización de socketId
    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);

      await prisma.user.updateMany({
        where: { socketId: socket.id },
        data: { socketId: null },
      });

      // Emitir la lista de usuarios activos
      const activeUsers = await prisma.user.findMany({
        where: { socketId: { not: null } },
      });
      io.emit('activeSessions', activeUsers);
    });

    // Enviar mensajes a todos los usuarios conectados
    socket.on('sendMessage', ({ message }) => {
      io.emit('sendMessage', { message, user: socket.id });
    });

    // Enviar mensajes privados
    socket.on('sendMessagesPrivate', async ({ message, recipientUserId }) => {
      const recipientUser = await prisma.user.findUnique({
        where: { id: recipientUserId },
      });

      if (recipientUser?.socketId) {
        io.to(recipientUser.socketId).emit('sendMessage', {
          message,
          user: socket.id,
        });
        io.to(socket.id).emit('sendMessage', { message, user: socket.id });
      } else {
        // Si el destinatario no está conectado
        io.to(socket.id).emit('sendMessage', { message, user: socket.id });
        console.log(
          'El usuario al que intentas enviar el mensaje no está conectado.',
        );
      }
    });
  });
};

export default socketHandler;
