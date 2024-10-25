import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/Modal.css';

const Modal = ({ character, onClose }) => {
  const formattedDate = new Date(character.created).toLocaleDateString('en-GB');

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <h3>{character.name}</h3>
        <p>Height: {character.height / 100} meters</p>
        <p>Mass: {character.mass} kg</p>
        <p>Date Added: {formattedDate}</p>
        <p>Number of Films: {character.films}</p>
        <p>Birth Year: {character.birth_year}</p>
        <h4>Homeworld Details</h4>
        <p>Name: {character.homeworld.name}</p>
        <p>Terrain: {character.homeworld.terrain}</p>
        <p>Climate: {character.homeworld.climate}</p>
        <p>Residents: {character.homeworld.residents}</p>
      </div>
    </div>
  );
};

export default Modal;
