import app from './app';

//Puerto a ejecutar
const PORT = process.env.PORT ?? 3000;

//levantamiento del servidor
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
