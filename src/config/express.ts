import express, { Application } from "express";


function configExpress(app:Application): void{
  app.use(express.json());

  //cors

  //morgan

  //urlencoded

  
}

export default configExpress;
