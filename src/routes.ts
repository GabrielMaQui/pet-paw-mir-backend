import type { Application } from 'express';
import userRouter from './api/user';

function routes(app: Application): void {
  app.use('/api/users', userRouter);
}

export default routes;
