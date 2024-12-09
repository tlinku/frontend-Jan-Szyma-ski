const { useState, useEffect } = React;

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    fetchPokemonList(displayCount);
  }, [displayCount]);

  const fetchPokemonList = async (count) => {
    const promises = Array.from({ length: count }, (_, i) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((response) =>
        response.json()
      )
    );
    try {
      const results = await Promise.all(promises);
      setPokemonList(results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    if (searchTerm) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => setPokemonList([data]))
        .catch((error) => console.error('Error fetching data:', error));
    }
  };

  return (
    <div>
      <div id="searcher">
        <div id="main_search">
          <input
            type="text"
            id="userInput"
            placeholder="Podaj nazwę Pokemona"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button id="submitButton" onClick={handleSearch}>
            Wyszukaj
          </button>
        </div>
        <div id="siatka">
          <button onClick={() => setDisplayCount(6)}>Wyświetl 6</button>
          <button onClick={() => setDisplayCount(12)}>Wyświetl 12</button>
          <button onClick={() => setDisplayCount(24)}>Wyświetl 24</button>
        </div>
      </div>
      <div id="pokemonList">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pokemon" onClick={() => setExpanded(!expanded)}>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      {expanded && (
        <>
          <p>
            Types: {pokemon.types.map((type) => type.type.name).join(', ')}
          </p>
          <p>
            Stats:{' '}
            {pokemon.stats
              .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
              .join(', ')}
          </p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));