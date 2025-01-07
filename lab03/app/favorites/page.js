"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import PokemonCard from "../../components/PokemonCard";

const FavoritesPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    fetchFavoritePokemon(favoriteIds);
  }, []);

  const fetchFavoritePokemon = async (ids) => {
    const promises = ids.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      )
    );
    try {
      const results = await Promise.all(promises);
      setFavoritePokemon(results);
    } catch (error) {
      console.error("Error fetching favorite Pokémon:", error);
    }
  };

  return (
    <div>
      <Navigation />
      <h1 id="favhead">Favorites</h1>
      <div id="pokemonList">
        {favoritePokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
