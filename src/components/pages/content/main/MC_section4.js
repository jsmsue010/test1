import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Popup from '../../../common/Popup';

function MC_section4() {
	const [news, setNews] = useState([]);
	const [videos, setVideos] = useState([]);
	const [open, setOpen] = useState(false);
	const [focusOn, setFocusOn] = useState(false);
	const [index, setIndex] = useState(0);
	const vid = useSelector((state) => state.youtubeReducer.youtube);
	const posts = JSON.parse(localStorage.getItem('posts'));
	const targetEl = useRef(null);

	useEffect(() => {
		if (vid) {
			const data = vid.slice(1, 3);
			setVideos(data);
		}
		if (posts) {
			const prevPosts = posts.slice(0, 3);
			setNews(prevPosts);
		}
	}, [vid]);

	useEffect(() => {
		if (focusOn && targetEl.current) {
			targetEl.current.focus();
		}
	}, [focusOn]);

	const click = (e, idx) => {
		setIndex(idx);
		setOpen(true);
		setFocusOn(false);
		targetEl.current = e.currentTarget;
	};

	const focusMove = (e, idx) => {
		if (e.key === 'Enter') {
			click(e, idx);
		}
	};

	return (
		<>
			<h3>LATEST NEWS</h3>

			<div
				className='vid'
				onClick={(e) => click(e, 0)}
				onKeyDown={(e) => focusMove(e, 0)}
				tabIndex={0}>
				<img
					src={
						videos.length > 0 ? videos[0].snippet.thumbnails.standard.url : null
					}
					alt='youtube thumbnail'
				/>
			</div>

			{news.map((m, idx) => {
				return (
					<div className='text' key={idx} tabIndex={0}>
						<div className='wrap'>
							<h4>{m.title}</h4>
						</div>
					</div>
				);
			})}

			<div
				className='vid'
				onClick={(e) => click(e, 1)}
				onKeyDown={(e) => focusMove(e, 1)}
				tabIndex={0}>
				<img
					src={
						videos.length > 0 ? videos[1].snippet.thumbnails.standard.url : null
					}
					alt='youtube thumbnail'
				/>
			</div>

			{open && (
				<Popup setOpen={setOpen} setFocusOn={setFocusOn}>
					<iframe
						aria-label={'youtube video'}
						title={vid[index].snippet.title}
						src={
							`https://www.youtube.com/embed/` +
							videos[index].snippet.resourceId.videoId
						}
						frameBorder='0'
						tabIndex={0}></iframe>
				</Popup>
			)}
		</>
	);
}

export default MC_section4;
