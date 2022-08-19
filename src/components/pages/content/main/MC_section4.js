import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Popup from '../../../common/Popup';

function MC_section4() {
	const [news, setNews] = useState([]);
	const [videos, setVideos] = useState([]);
	const [open, setOpen] = useState(false);
	const vid = useSelector((state) => state.youtubeReducer.youtube);
	const posts = JSON.parse(localStorage.getItem('posts'));

	useEffect(() => {
		console.log('vid', vid);
		if (vid) {
			const data = vid.slice(1, 3);
			setVideos(data);
		}
		if (posts) {
			const prevPosts = posts.slice(0, 3);
			setNews(prevPosts);
		}
	}, [vid]);

	return (
		<div className='prevNews'>
			<div className='wrapper1'>
				<h1>LATEST NEWS</h1>
			</div>

			<div className='vid' onClick={() => open(true)}>
				<img
					src={
						videos.length > 0 ? videos[0].snippet.thumbnails.standard.url : null
					}
					alt='youtube thumbnail'
				/>
			</div>

			{news.map((m, idx) => {
				return (
					<div className='text' key={idx}>
						<div className='wrap'>
							<h2>{m.title}</h2>
						</div>
					</div>
				);
			})}

			<div className='vid' onClick={() => open(true)}>
				<img
					src={
						videos.length > 0 ? videos[1].snippet.thumbnails.standard.url : null
					}
					alt='youtube thumbnail'
				/>
			</div>

			{open && <Popup />}
		</div>
	);
}

export default MC_section4;
