import React from 'react';

export default function PokemonLayout({ children }) {
  return (
    <div>
      <div>Filter Bar</div>
      <div>{children}</div>
    </div>
  );
}