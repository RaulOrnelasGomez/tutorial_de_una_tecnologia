import { useState, useEffect } from "react";
import Search from "./components/Search";
import CharacterList from "./components/Character";
import charactersData from "./data/characters.json";
import "./App.css";

function App() {

  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setCharacters(charactersData);
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Star Wars Explorer</h1>

      <Search query={query} setQuery={setQuery} />

      <span className="result-count">
        {filteredCharacters.length} encontrados
      </span>

      <CharacterList characters={filteredCharacters} />

    </div>
  );
}

export default App;