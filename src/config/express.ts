import cors from 'cors';
import express, { type Application } from 'express';
import morgan from 'morgan';

import swaggerJsDoc from 'swagger-jsdoc';
//Swagger
import swaggerUi, { serve } from 'swagger-ui-express';
import { options } from '../swaggerOptions';

function configExpress(app: Application): void {
  app.use(express.json());
  //cors
  app.use(cors());
  //morgan
  app.use(morgan('dev'));
  //urlencoded

  const specs = swaggerJsDoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
}

export default configExpress;
