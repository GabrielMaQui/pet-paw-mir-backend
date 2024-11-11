import http from 'node:http';
import { Server } from 'socket.io';
import app from './app';
import socketHandler from './socket/socketHandler';

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },
});

socketHandler(io);

//Puerto a ejecutar
const PORT = process.env.PORT ?? 3000;

//levantamiento del servidor
server.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
