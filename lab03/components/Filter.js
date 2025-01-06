"use client";

import React from 'react';

const Filter = ({ handleTypeChange, handleLimitChange }) => {
  return (
    <div id="filter_options">
      <select id="filter_type" onChange={(e) => handleTypeChange(e.target.value)}>
        <option value="any">any</option>
        <option value="bug">bug</option>
        <option value="dark">dark</option>
        <option value="dragon">dragon</option>
        <option value="electric">electric</option>
        <option value="fairy">fairy</option>
        <option value="fighting">fighting</option>
        <option value="fire">fire</option>
        <option value="flying">flying</option>
        <option value="ghost">ghost</option>
        <option value="grass">grass</option>
        <option value="ground">ground</option>
        <option value="ice">ice</option>
        <option value="normal">normal</option>
        <option value="poison">poison</option>
        <option value="psychic">psychic</option>
        <option value="rock">rock</option>
        <option value="steel">steel</option>
        <option value="water">water</option>
      </select>
    </div>
  );
};

export default Filter;