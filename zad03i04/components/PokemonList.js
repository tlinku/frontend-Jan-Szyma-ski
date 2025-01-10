"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Navigation from "./Navigation";
import PokemonCard from "./PokemonCard";
import Filter from "./Filter";

const PokemonList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get("type");
  const search = searchParams.get("search");
  const limit = searchParams.get("limit");

  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [displayCount, setDisplayCount] = useState(
    limit ? parseInt(limit) : 20
  );

  useEffect(() => {
    fetchPokemonList(displayCount, type, searchTerm);
  }, [displayCount, type, searchTerm]);

  const fetchPokemonList = async (count, type, search) => {
    const initialFetchCount = type ? count * 20 : count;

    const promises = Array.from({ length: initialFetchCount }, (_, i) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((response) =>
        response.json()
      )
    );

    try {
      const results = await Promise.all(promises);

      if (type === "any" || !type) {
        setPokemonList(results.slice(0, count));
      } else {
        const filteredResults = results.filter((pokemon) =>
          pokemon.types.some((t) => t.type.name === type)
        );

        if (filteredResults.length < count) {
          console.warn(
            `Not enough Pokemon of type ${type}. Showing ${filteredResults.length} results.`
          );
        }

        setPokemonList(filteredResults.slice(0, count));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    params.set("search", term);
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };

  const handleTypeChange = (newType) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", newType);
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };

  const handleLimitChange = (newLimit) => {
    setDisplayCount(newLimit);
    const params = new URLSearchParams(searchParams);
    params.set("limit", newLimit.toString());
    window.history.pushState(null, "", `${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Navigation
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        setDisplayCount={handleLimitChange}
      />
      <div id="filterDiv">
        <div id="name">Filters</div>
        <Filter
          handleTypeChange={handleTypeChange}
          handleLimitChange={handleLimitChange}
        />
      </div>
      <div id="pokemonList">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
