import React from 'react';
import PokemonDetails from '../../../components/PokemonDetails';

const PokemonDetailsPage = ({ params }) => {
  const { id } = params;
  return <PokemonDetails id={id} />;
};

export default PokemonDetailsPage;