export default function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search characters (e.g. Luke, Vader...)"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}