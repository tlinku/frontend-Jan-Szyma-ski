import React from 'react';

export default function PokemonDetailsLayout({ children }) {
  return (
    <div>
      <div>Details</div>
      <div>{children}</div>
    </div>
  );
}