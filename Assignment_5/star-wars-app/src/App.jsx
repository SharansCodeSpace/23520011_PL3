import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import Loader from './components/Loader';
import './assets/App.css';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	const handleAllImagesLoaded = () => {
		setIsLoading(false);
	};

	return (
		<>
			{isLoading && <Loader />}
			<div className="background-image"></div>
			<h1>STAR WARS CHARACTERS</h1>
			<CharacterList onImagesLoaded={handleAllImagesLoaded} />
		</>
	);
};

export default App;
