import React from 'react';
import '../assets/Loader.css';

const Loader = () => {
	return (
		<div id="preloader">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
