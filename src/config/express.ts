import cors from 'cors';
import express, {type  Application } from "express";
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
