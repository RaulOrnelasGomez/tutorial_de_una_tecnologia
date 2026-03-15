import CharacterCard from "./CharacterCard";

export default function CharacterList({ characters }) {

  if (characters.length === 0) {
    return <p className="no-results">No characters found</p>;
  }

  return (
    <div className="grid">
      {characters.map((char, index) => (
        <CharacterCard key={index} character={char} />
      ))}
    </div>
  );
}