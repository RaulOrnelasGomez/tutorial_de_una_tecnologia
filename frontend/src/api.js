export async function getCharacters(name) {
  const response = await fetch("http://localhost:3001/characters");

  const data = await response.json();

  const filtered = data.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );

  return filtered;
}