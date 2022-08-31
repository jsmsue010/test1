import React, { useState, useEffect, useRef } from 'react';
import BDC_create from './BDC_create';
import BDC_read from './BDC_read';

function Board_content() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('posts'));
		if (data) setData(data);
	}, []);
	useEffect(() => {
		if (data) localStorage.setItem('posts', JSON.stringify(data));
	}, [data]);

	return (
		<article className='board'>
			<h1>Q&amp;A</h1>
			<p className='intro'>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. IpsNumquam
				aliquid, incidunt magni alias saepe quidem
			</p>
			<div className='inner'>
				<BDC_read data={data} setData={setData} />
				<BDC_create data={data} setData={setData} />
			</div>
		</article>
	);
}

export default Board_content;
