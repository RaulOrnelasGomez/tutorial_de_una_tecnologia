export async function getCharacters(name) {
  const response = await fetch("http://localhost:3001/characters");

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(data.error || "Error al obtener personajes del servidor");
  }

  const filtered = data.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase()),
  );

  return filtered;
}
