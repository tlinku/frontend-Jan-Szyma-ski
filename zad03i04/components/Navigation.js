"use client";
import React from "react";
import Link from "next/link";
import { useRef } from "react";

const Navigation = ({
  setDisplayCount, // Changed from displayCount
  handleSearch,
  displayType,
  setdisplayType,
  isComparison
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
            <Link href="/favorites">Favorites</Link>
            <Link href="/comparison">Compare</Link>
          </div>
          {!isComparison && (
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
          )}
          {!isComparison && (
          <div id="siatka">
            <button id="wyświetlana_siatka6" onClick={() => setDisplayCount(6)}>
              Wyświetl 6
            </button>
            <button
              id="wyświetlana_siatka12"
              onClick={() => setDisplayCount(12)}
            >
              Wyświetl 12
            </button>
            <button
              id="wyświetlana_siatka24"
              onClick={() => setDisplayCount(24)}
            >
              Wyświetl 24
            </button>
          </div>
            )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
