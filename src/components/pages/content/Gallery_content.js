import React, { useEffect, useRef, useState } from 'react';
import Popup from '../../common/Popup';
import { useSelector } from 'react-redux';

function Gallery_content() {
	const pics = useSelector((state) => state.flickrReducer.flickr);
	const [items, setArr] = useState([]);
	const [index, setIndex] = useState(0);
	const [open, setOpen] = useState(false);
	const [focusOn, setFocusOn] = useState(false);

	const gallery = useRef(null);
	const targetEl = useRef(null);

	useEffect(() => {
		console.log(pics);
		if (pics) {
			setArr(pics);
		}
	}, [pics]);

	useEffect(() => {
		if (focusOn && targetEl.current) {
			targetEl.current.focus();
		}
	}, [focusOn]);

	useEffect(() => {
		if (gallery.current) {
			const p = gallery.current.querySelectorAll('p');
			const io = new IntersectionObserver((entry) => {
				if (entry[0].isIntersecting) {
					entry[0].target.style.opacity = '1';
					entry[0].target.style.transform = `translateX(0)`;
				}
			});
			io.observe(p[0]);
			io.observe(p[1]);
		}
	}, []);

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
		<article className='gallery' tabIndex={0} ref={gallery}>
			<h1>DETAIL CUT</h1>
			<p>improve your performance and give shape to your ambitions</p>
			<div className='inner'>
				<div className='wrapper'>
					<ul className='g_list'>
						{items.map((item, idx) => {
							return (
								<li
									className='pic'
									key={idx}
									tabIndex={0}
									onClick={(e) => click(e, idx)}
									onKeyDown={(e) => focusMove(e, idx)}>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
										alt={`product details` + idx}
									/>
									<h2>{item.title}</h2>
								</li>
							);
						})}
					</ul>
					<p className='last'>
						"We believe that making a succesful business is both a science and a
						passion."
					</p>
				</div>
			</div>

			{open && (
				<Popup setOpen={setOpen} setFocusOn={setFocusOn}>
					<img
						src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
						alt={'one of gallery photo'}
					/>
				</Popup>
			)}
		</article>
	);
}

export default Gallery_content;
