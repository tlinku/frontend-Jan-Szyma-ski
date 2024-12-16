"use client";
import React, { useState, useEffect } from 'react';

const PokemonDetails = ({ id }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonDetails(id);
  }, [id]);

  const fetchPokemonDetails = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>Stats: {pokemon.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
};

export default PokemonDetails;