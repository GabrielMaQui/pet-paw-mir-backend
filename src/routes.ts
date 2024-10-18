import type { Application } from 'express';
import postRouter from './api/post';
import userRouter from './api/user';
import authLocalRouter  from './auth/local';


function routes(app: Application): void {
  app.use('/api/users', userRouter);

  app.use('/auth/local', authLocalRouter);

  app.use('/api/posts', postRouter);

}

export default routes;
