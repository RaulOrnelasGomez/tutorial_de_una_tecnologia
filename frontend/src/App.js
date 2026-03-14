import { useState } from "react";
import { getCharacters } from "./api";
import { useCharacters } from "./state";

function App() {
  const [query, setQuery] = useState("");
  const { characters, setCharacters } = useCharacters();

  async function search() {
    const results = await getCharacters(query);
    setCharacters(results);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Star Wars Explorer</h1>

      <input
        type="text"
        placeholder="Search character..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={search}>Search</button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,200px)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <img src={character.image} alt={character.name} width="120" />

            <h3>{character.name}</h3>

            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;