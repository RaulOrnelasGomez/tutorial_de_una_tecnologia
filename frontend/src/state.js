import { useState } from "react";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);

  return { characters, setCharacters };
}