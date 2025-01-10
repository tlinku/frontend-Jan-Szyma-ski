import React from "react";
import Navigation from "../../../components/Navigation";

export default function PokemonDetailsLayout({ children }) {
  return (
    <div>
      <Navigation />
      <div>{children}</div>
    </div>
  );
}
