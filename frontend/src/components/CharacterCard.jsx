export default function CharacterCard({ character }) {
    return (
        <div className="card">

            <img
                src={character.image}
                alt={character.name}
                className="character-img"
            />

            <h3>{character.name}</h3>

            <p><strong>Height:</strong> {character.height}</p>
            <p><strong>Mass:</strong> {character.mass}</p>
            <p><strong>Gender:</strong> {character.gender}</p>

        </div>
    );
}