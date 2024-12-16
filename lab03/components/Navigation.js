"use client";
import React from 'react';
import Link from 'next/link';
import handleSearch from './PokemonList';
const Navigation = ({ searchTerm, setSearchTerm, handleSearch, setDisplayCount }) => {
  return (
    <nav>

      <div id="searcher">
        <div id="menu">
        <Link href="/">Home</Link>
        <Link href="/pokemon">Pokemon</Link>
        <Link href="/favorites">Favorites</Link>
        </div>
        <div id="main_search">
          <input
            type="text"
            id="userInput"
            placeholder="Podaj nazwę Pokemona"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button id="submitButton" onClick={handleSearch}>
            Wyszukaj
          </button>
        </div>
        <div id="siatka">
          <button id="wyświetlana_siatka6" onClick={() => setDisplayCount(6)}>Wyświetl 6</button>
          <button id="wyświetlana_siatka12" onClick={() => setDisplayCount(12)}>Wyświetl 12</button>
          <button id="wyświetlana_siatka24" onClick={() => setDisplayCount(24)}>Wyświetl 24</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;