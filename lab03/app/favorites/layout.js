// app/favorites/layout.js
import React from 'react';

export default function FavoritesLayout({ children }) {
  return (
    <div>
      <div>Favorites</div>
      <div>{children}</div>
    </div>
  );
}