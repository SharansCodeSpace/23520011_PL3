import React from 'react';
import Modal from './Modal';
import '../assets/CharacterCard.css';
import { Image, Shimmer } from 'react-shimmer';

const CharacterCard = ({ character, onImageLoad, activeModal, setActiveModal }) => {
  const isActive = activeModal === character.id;

  const toggleModal = () => {
    if (isActive) {
      setActiveModal(null);
    } else {
      setActiveModal(character.id);
    }
  };

  const randomImage = `https://picsum.photos/200/300?starwars=${character.id}`;

  return (
    <>
      <div
        className="character-card"
        onClick={toggleModal}
        id={`card-${character.id}`}
      >
        <div className="cover">
          <Image
            src={randomImage}
            alt={character.name}
            fallback={<Shimmer width={210} height={300} />}
            onLoad={onImageLoad}
          />
          <h3>{character.name}</h3>
        </div>
        {isActive && <Modal character={character} onClose={() => setActiveModal(null)} />}
      </div>
    </>
  );
};

export default CharacterCard;
