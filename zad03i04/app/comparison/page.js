"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import PokemonCard from "../../components/PokemonCard";

const ComparisonPage = () => {
  const [comparedPokemon, setToComparison] = useState([]);
    useEffect(() => {
      const comparedIds = JSON.parse(localStorage.getItem("comparison")) || [];
      fetchComparedPokemon(comparedIds);
    }, []);
const fetchComparedPokemon = async (ids) => {
    const promises = ids.map((id) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      )
    );
    try {
      const results = await Promise.all(promises);
      setToComparison(results);
    } catch (error) {
      console.error("Error fetching favorite Pokémon:", error);
    }
  };
  return (
    <div>
      <Navigation isComparison={true} />
      <h1 id="comphead">Comparison</h1>
      <div id="pokemonList">
        {comparedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} isComparison ={true} />
        ))}
      </div>
    </div>
  );
};

export default ComparisonPage;