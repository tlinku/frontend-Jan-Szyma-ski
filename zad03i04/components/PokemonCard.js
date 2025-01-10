"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const PokemonCard = ({ pokemon, isComparison = false }) => {
  const [expanded, setExpanded] = useState(isComparison ? true : false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    console.log("checked");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(pokemon.id)) {
      setIsFavorite(true);
    }
  }, [pokemon.id]);
  useEffect(() => {
    const comparison = JSON.parse(localStorage.getItem("comparison")) || [];
    if (comparison.includes(pokemon.id)) {
      setIsCompared(true);
    }
  }, [pokemon.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log(favorites);

    if (isFavorite) {
      const newFavorites = favorites.filter((id) => id !== pokemon.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      favorites.push(pokemon.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };
  const toggleComparison = () => {
    const comparison = JSON.parse(localStorage.getItem("comparison")) || [];
    console.log(comparison);

    if (isCompared) {
      const newComparison = comparison.filter((id) => id !== pokemon.id);
      localStorage.setItem("comparison", JSON.stringify(newComparison));
      } 
    else {
      if (comparison.length < 2) {
      comparison.push(pokemon.id);
      localStorage.setItem("comparison", JSON.stringify(comparison));
      } else {
          alert("You must compare two pokemons");
        }
    }
    setIsCompared(!isCompared);
   };

  const navigateToPokemonPage = (e) => {
    e.stopPropagation();
    window.location.href = `/Pokemon/${pokemon.id}`;
  };

  return (
    <div className="pokemon" onClick={() => !isComparison && setExpanded(!expanded)}>
      <div id="specialbuttons">
        <div id="displayInAnother" onClick={navigateToPokemonPage}>
          INFO
        </div>
        <div
          id="comp"
          className={isCompared ? "compared" : ""}
          onClick={(e) => {
            toggleComparison();
            e.stopPropagation();
          }}
        >
          {isCompared ? "Porównane" : "Porównaj"}
        </div>
        <div
          id="fav"
          className={isFavorite ? "favorite" : ""}
          onClick={(e) => {
            toggleFavorite();
            e.stopPropagation();
          }}
        >
          {isFavorite ? "❤️" : "🤍"}
        </div>
        
      </div>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      {expanded && (
        <>
          <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>
            Stats:{" "}
            {pokemon.stats
              .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
              .join(", ")}
          </p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
