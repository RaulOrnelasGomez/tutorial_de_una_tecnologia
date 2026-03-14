// ============================================================
// IMPORTANTE: requiere node-fetch versión 2
// Instalar con: npm install node-fetch@2
// ============================================================
// characters.controller.js
// Autores:
//   Alejandro  — Backend API     — Consulta a SWAPI
//   Raul Contreras — Backend Logic — Procesamiento de datos e imágenes
//
// Responsabilidades:
//   - Conexión y fetch a https://swapi.dev/api
//   - Resolución de URLs anidadas (homeworld, films, vehicles, starships)
//   - Procesamiento de imágenes con sharp
//   - Construcción del JSON final para el frontend
// ============================================================
// Dependencias requeridas:
//   npm install sharp node-fetch
// ============================================================

const fetch = require("node-fetch");

const CHARACTERS_API = "https://akabab.github.io/starwars-api/api/all.json";

// ------------------------------------------------------------
// GET /api/characters
// Lista todos los personajes (paginada por SWAPI, página 1 por defecto)
// Query param opcional: ?page=2
// ------------------------------------------------------------
const getAllCharacters = async (req, res) => {
  try {
    const response = await fetch(CHARACTERS_API);
    const data = await response.json();

    const characters = data.map((person) => ({
      id: person.id,
      name: person.name,
      gender: person.gender,
      birth_year: person.birthYear,
      height: person.height,
      mass: person.mass,
      image: person.image,
    }));

    res.json(characters);
  } catch (error) {
    console.error("[getAllCharacters]", error.message);
    res
      .status(500)
      .json({ error: "No se pudo obtener la lista de personajes" });
  }
};

// ------------------------------------------------------------
// GET /api/characters/:id
// Detalle completo de un personaje con imagen, planeta y películas
// ------------------------------------------------------------
const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(CHARACTERS_API);
    const data = await response.json();

    const person = data.find((p) => p.id == id);

    if (!person) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.json({
      id: person.id,
      name: person.name,
      gender: person.gender,
      birth_year: person.birthYear,
      height: person.height,
      mass: person.mass,
      hair_color: person.hairColor,
      skin_color: person.skinColor,
      eye_color: person.eyeColor,
      image: person.image,
    });
  } catch (error) {
    console.error("[getCharacterById]", error.message);
    res.status(500).json({ error: "Error al procesar el personaje" });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
};
