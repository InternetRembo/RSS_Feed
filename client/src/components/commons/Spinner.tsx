import React from 'react';

const Spinner = () => {
	return (
		<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
			<div className="animate-spin rounded-full border-t-4 border-purple-500 border-solid h-[400px] w-[400px]"></div>
		</div>
	);
};

export default Spinner;