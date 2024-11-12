import type { Application } from 'express';
import chatRouter from './api/chat';
import commentRouter from './api/comment';
import favoritesRouter from './api/favorites';
import messageRouter from './api/message';
import postRouter from './api/post';
import settingRouter from './api/setting';
import userRouter from './api/user';
import authLocalRouter from './auth/local';

function routes(app: Application): void {
  app.use('/api/users', userRouter);
  app.use('/auth/local', authLocalRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/setting', settingRouter);
  app.use('/api/favorites', favoritesRouter);
  app.use('/comments', commentRouter);
  app.use('/chat', chatRouter);
  app.use('/menssage', messageRouter);
}

export default routes;
