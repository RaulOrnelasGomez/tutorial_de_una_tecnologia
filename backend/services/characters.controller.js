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
const sharp = require("sharp");

const SWAPI_BASE = "https://akabab.github.io/starwars-api/api/all.json";
const IMAGE_BASE = "https://starwars-visualguide.com/assets/img/characters";
const PLACEHOLDER_COLOR = { r: 20, g: 20, b: 20 };

// ------------------------------------------------------------
// Utilidad: obtener imagen procesada con sharp
// Devuelve base64 o null si no existe imagen para ese ID
// ------------------------------------------------------------
const fetchAndProcessImage = async (id) => {
  try {
    const res = await fetch(`${IMAGE_BASE}/${id}.jpg`);
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const processed = await sharp(Buffer.from(buffer))
      .resize(300, 400, { fit: "cover", position: "top" })
      .jpeg({ quality: 80 })
      .toBuffer();

    return `data:image/jpeg;base64,${processed.toString("base64")}`;
  } catch {
    return null;
  }
};

// ------------------------------------------------------------
// Utilidad: placeholder gris cuando no hay imagen disponible
// ------------------------------------------------------------
const generatePlaceholder = async () => {
  const buffer = await sharp({
    create: {
      width: 300,
      height: 400,
      channels: 3,
      background: PLACEHOLDER_COLOR,
    },
  })
    .jpeg()
    .toBuffer();

  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

// ------------------------------------------------------------
// Utilidad: extraer ID numérico desde una URL de SWAPI
// Ejemplo: "https://swapi.dev/api/people/1/" → 1
// ------------------------------------------------------------
const extractId = (url) => {
  const parts = url.replace(/\/$/, "").split("/");
  return parts[parts.length - 1];
};

// ------------------------------------------------------------
// Utilidad: resolver un array de URLs en paralelo
// Devuelve un campo específico de cada resultado
// ------------------------------------------------------------
const resolveUrls = async (urls, field) => {
  const results = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((r) => r.json())
        .then((data) => data[field])
        .catch(() => null)
    )
  );
  return results.filter(Boolean);
};

// ------------------------------------------------------------
// GET /api/characters
// Lista todos los personajes (paginada por SWAPI, página 1 por defecto)
// Query param opcional: ?page=2
// ------------------------------------------------------------
const getAllCharacters = async (req, res) => {
  try {

    const response = await fetch(SWAPI_BASE);
    const data = await response.json();

    const characters = await Promise.all(
      data.map(async (person) => {

        const image =
          (await fetchAndProcessImage(person.id)) ||
          (await generatePlaceholder());

        return {
          id: person.id,
          name: person.name,
          gender: person.gender,
          birth_year: person.birthYear,
          height: person.height,
          mass: person.mass,
          image,
        };
      })
    );

    res.json(characters);

  } catch (error) {
    console.error("[getAllCharacters]", error.message);
    res.status(500).json({ error: "No se pudo obtener la lista de personajes" });
  }
};

// ------------------------------------------------------------
// GET /api/characters/:id
// Detalle completo de un personaje con imagen, planeta y películas
// ------------------------------------------------------------
const getCharacterById = async (req, res) => {
  try {

    const { id } = req.params;

    const response = await fetch(SWAPI_BASE);
    const data = await response.json();

    const person = data.find(p => p.id == id);

    if (!person) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    const image =
      (await fetchAndProcessImage(person.id)) ||
      (await generatePlaceholder());

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
      image
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
