import React from 'react';

function BDC_delete({ data, setData, idx, setHeight, setOpen }) {
	const del = (index) => {
		const newData = data.filter((_, idx) => idx !== index);
		setData(newData);
	};

	return (
		<button
			onClick={() => {
				del(idx);
				setHeight(0);
				setTimeout(() => setOpen(false), 500);
			}}>
			delete
		</button>
	);
}

export default BDC_delete;
