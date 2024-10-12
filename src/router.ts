import { Application } from 'express';
import userRouter from './api/user';

function routes(app: Application): void{
  app.use('/api/user', userRouter)
}

export default routes;


