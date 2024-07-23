import express from 'express';
const app = express()
const port = 5000

import AulaController from './controllers/AulaController.js';

// For parsing application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



//CRUD Professor
app.get("/aulas",AulaController.readAulas);
app.put('/aulas/:id', AulaController.atualizarAula);
app.post('/aulas/data-periodo', AulaController.readAulasPorDataEPeriodo);
app.put('/chave/:id', AulaController.atualizarChave);

// app.post("/professor",ProfessorController.create)
// app.put("/professor/:id",ProfessorController.update)
// app.delete("/professor/:id",ProfessorController.destroy)
// app.get("/professor/:id",ProfessorController.mostrarProfessor)



//CRUD Turma
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
