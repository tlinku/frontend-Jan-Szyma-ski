document
  .getElementById("wyświetlana_siatka6")
  .addEventListener("click", () => displayPokemonList(6));

document
  .getElementById("wyświetlana_siatka12")
  .addEventListener("click", () => displayPokemonList(12));

document
  .getElementById("wyświetlana_siatka24")
  .addEventListener("click", () => displayPokemonList(24));

function displayPokemonDetails(pokemon) {
  const pokemonListDiv = document.getElementById("pokemonList");

  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent = `${pokemon.name}`;

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;

  const pokemonId = document.createElement("p");
  pokemonId.textContent = pokemon.id;

  // Add event listener to toggle class on click
  pokemonDiv.addEventListener("click", () => {
    pokemonDiv.classList.toggle("expanded");
    if (pokemonDiv.classList.contains("expanded")) {
      // Add additional details when expanded
      const pokemonTypes = document.createElement("p");
      pokemonTypes.textContent = `Types: ${pokemon.types
        .map((type) => type.type.name)
        .join(", ")}`;
      pokemonTypes.classList.add("pokemon-types");

      const pokemonStats = document.createElement("p");
      pokemonStats.textContent = `Stats: ${pokemon.stats
        .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
        .join(", ")}`;
      pokemonStats.classList.add("pokemon-stats");

      const pokemonHeight = document.createElement("p");
      pokemonHeight.textContent = `Height: ${pokemon.height}`;
      pokemonHeight.classList.add("pokemon-height");

      const pokemonWeight = document.createElement("p");
      pokemonWeight.textContent = `Weight: ${pokemon.weight}`;
      pokemonWeight.classList.add("pokemon-weight");

      pokemonDiv.appendChild(pokemonTypes);
      pokemonDiv.appendChild(pokemonStats);
      pokemonDiv.appendChild(pokemonHeight);
      pokemonDiv.appendChild(pokemonWeight);
    } else {
      pokemonDiv
        .querySelectorAll(
          ".pokemon-types, .pokemon-stats, .pokemon-height, .pokemon-weight"
        )
        .forEach((el) => el.remove());
    }
  });

  pokemonDiv.appendChild(pokemonName);
  pokemonDiv.appendChild(pokemonImage);
  pokemonDiv.appendChild(pokemonId);
  pokemonListDiv.appendChild(pokemonDiv);
}

async function displayPokemonList(pokeNumber) {
  const pokemonListDiv = document.getElementById("pokemonList");
  pokemonListDiv.innerHTML = "";

  const promises = Array.from({ length: pokeNumber }, (_, i) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((response) =>
      response.json()
    )
  );

  try {
    const pokemonData = await Promise.all(promises);
    pokemonData.forEach(displayPokemonDetails);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
displayPokemonList(20);

document
  .getElementById("submitButton")
  .addEventListener("click", async function () {
    const pokemon = document.getElementById("userInput").value.toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      document.getElementById("pokemonList").innerHTML = "";
      displayPokemonDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
