import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import '../assets/CharacterList.css';

const CharacterList = ({ onImagesLoaded }) => {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [imagesLoaded, setImagesLoaded] = useState(0);
	const [totalImages, setTotalImages] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [activeModal, setActiveModal] = useState(null);

	const fetchCharacters = async (page) => {
		setLoading(true);
		try {
			const response = await axios.get(`http://localhost:5000/people?_page=${page}&_per_page=4`);
			setCharacters(response.data.data);
			setTotalImages(response.data.data.length);
			setTotalPages(response.data.pages);
			setImagesLoaded(0);
			setLoading(false);
		} catch (error) {
			setError('Error fetching data. Please try again later.');
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCharacters(currentPage);
	}, [currentPage]);

	useEffect(() => {
		if (imagesLoaded === totalImages && totalImages > 0) {
			onImagesLoaded();
		}
	}, [imagesLoaded, totalImages, onImagesLoaded]);

	const handleNextPage = () => setCurrentPage(currentPage + 1);
	const handlePreviousPage = () => setCurrentPage(currentPage - 1);

	const handleImageLoad = () => {
		setImagesLoaded((prev) => prev + 1);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<>
			<div className="character-list">
				{characters.map((character) => (
					<CharacterCard
						key={character.id}
						character={character}
						onImageLoad={handleImageLoad}
						activeModal={activeModal}
						setActiveModal={setActiveModal}
					/>
				))}
			</div>
			<div className="pagination">
				<button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
				<button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
			</div>
		</>
	);
};

export default CharacterList;
