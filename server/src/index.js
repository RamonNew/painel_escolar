import app from './App.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
