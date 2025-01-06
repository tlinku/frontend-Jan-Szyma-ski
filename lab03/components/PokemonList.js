"use client";

import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [displayCount, setDisplayCount] = useState(20);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => setPokemonList([data]))
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

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
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id="frontside">
      <Navigation
        searchTerm={""}
        displayCount={fetchPokemonList}
        handleSearch={handleSearch}
        setDisplayCount={20}
      ></Navigation>
      <div id="pokemonList">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};


export default PokemonList;
