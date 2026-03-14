//Conexion de API usando Express
//Autor: Alejandro Perez Gomez

const express = require("express");
const cors = require("cors");

const {
  getAllCharacters,
  getCharacterById,
} = require("./services/characters.controller");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/characters", getAllCharacters);
app.get("/characters/:id", getCharacterById);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
