//Conexion de API usando Express
//Autor: Alejandro Perez Gomez

const express = require("express");
const cors = require("cors");

const { getAllCharacters, getCharacterById } = require("./characters.controller");

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/characters", getAllCharacters);
app.get("/api/characters/:id", getCharacterById);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
