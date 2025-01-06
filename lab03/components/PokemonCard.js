"use client";

import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemon }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("checked");
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(pokemon.id)) {
      setIsFavorite(true);
    }
  }, [pokemon.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites);
    
    if (isFavorite) {
      const newFavorites = favorites.filter((id) => id !== pokemon.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(pokemon.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pokemon" onClick={() => setExpanded(!expanded)}>
      <div
        id="fav"
        className={isFavorite ? 'favorite' : ''}
        onClick={(e) => {
            console.log('clicked');
            toggleFavorite();
            e.stopPropagation();
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </div>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      {expanded && (
        <>
          <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
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

export default PokemonCard;