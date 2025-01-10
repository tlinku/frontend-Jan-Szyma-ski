import React from "react";
import PokemonDetails from "../../../components/PokemonDetails";

const PokemonDetailsPage = ({ params }) => {
  const { id } = params;
  return (
    <div id="upper">
      <div id="details">
        <PokemonDetails id={id} />
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
