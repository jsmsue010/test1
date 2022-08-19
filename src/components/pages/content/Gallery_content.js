import React, { useEffect, useRef, useState } from 'react';
import Popup from '../../common/Popup';
import { useSelector } from 'react-redux';

const path = process.env.PUBLIC_URL;

function Gallery_content() {
	const pics = useSelector((state) => state.flickrReducer.flickr);
	const [items, setArr] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const pop = useRef(null);

	useEffect(() => {
		console.log(pics);
		if (pics) {
			setArr(pics);
		}
	}, [pics]);

	return (
		<article className='gallery'>
			<h1>DETAIL CUT</h1>
			<p>improve your performance and give shape to your ambitions</p>
			<div className='inner'>
				<div className='g_list'>
					<div className='wrapper'>
						{items.map((item, idx) => {
							return (
								<article key={idx}>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
										alt=''
										onClick={() => {
											setIndex(idx);
											setLoading(true);
											pop.current.open();
										}}
									/>
									<h2>{item.title}</h2>
								</article>
							);
						})}
					</div>
					<p className='last'>
						"We believe that making a succesful business is both a science and a
						passion."
					</p>
				</div>
			</div>

			{loading && (
				<Popup ref={pop}>
					<img
						src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
						alt=''
					/>
					<span onClick={() => pop.current.close()}>close</span>
				</Popup>
			)}
		</article>
	);
}

export default Gallery_content;
