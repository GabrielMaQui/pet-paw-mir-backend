import type { Application } from 'express';
import postRouter from './api/post';
import userRouter from './api/user';

function routes(app: Application): void {
  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
}

export default routes;
