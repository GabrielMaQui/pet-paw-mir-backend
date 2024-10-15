import express from 'express'
import configExpress from './config/express';
import routes from './router';

//Levantamiento del express
const app = express();

//Configuracion
configExpress(app);
routes(app);

//Puerto a ejecutar
const PORT = 3000;


//levantamiento del servidor 
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}` )
})
