import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan';



function configExpress(app:Application): void{
  app.use(express.json());

  //cors
  app.use(cors());

  //morgan
  app.use(morgan('dev'));

  //urlencoded


}

export default configExpress;
