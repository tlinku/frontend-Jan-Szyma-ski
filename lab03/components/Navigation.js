"use client";
import React from "react";
import Link from "next/link";
import { useRef } from "react";
const Navigation = ({
  displayCount,
  searchTerm,
  handleSearch,
  setDisplayCount,
}) => {
  const searchInputRef = useRef();

  function doSearch() {
    handleSearch(searchInputRef.current.value);
  }

  return (
    <header>
      <nav>
        <div id="searcher">
          <div id="menu">
            <Link href="/">Home</Link>
            <Link href="/pokemon">Pokemon</Link>
            <Link href="/favorites">Favorites</Link>
          </div>
          <div id="main_search">
            <input
              id="userInput"
              ref={searchInputRef}
              placeholder="podaj nazwę pokemona"
            />
            <button id="submitButton" onClick={doSearch}>
              Wyszukaj
            </button>
          </div>
          <div id="siatka">
            <button id="wyświetlana_siatka6" onClick={() => displayCount(6)}>
              Wyświetl 6
            </button>
            <button id="wyświetlana_siatka12" onClick={() => displayCount(12)}>
              Wyświetl 12
            </button>
            <button id="wyświetlana_siatka24" onClick={() => displayCount(24)}>
              Wyświetl 24
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
