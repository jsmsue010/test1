import React, { useEffect, useRef } from 'react';

function YC_advertisement({
	adv,
	setIndex,
	setOpen,
	focusOn,
	setFocusOn,
	setType,
}) {
	const vids = useRef(null);
	const advIndex = useRef(0);

	useEffect(() => {
		if (vids.current) {
			const io = new IntersectionObserver(
				(entry) => {
					if (window.innerWidth <= 400) {
						const advBox = vids.current.querySelectorAll('.adv-box');
						advBox.forEach((a) => (a.style.opacity = `1`));
					} else if (entry[0].isIntersecting && window.innerWidth > 400) {
						const advBox = vids.current.querySelectorAll('.adv-box');
						advBox.forEach((a) => (a.style.opacity = `1`));
					}
				},
				{ threshold: 0.5 }
			);
			io.observe(vids.current);
		}
	}, []);

	useEffect(() => {
		if (focusOn === 'adv') {
			console.log(focusOn);
			const advs = vids.current.querySelectorAll('.adv-box');
			advs[advIndex.current].focus();
		}
	}, [focusOn]);

	const click = (idx) => {
		setIndex(idx);
		setOpen(true);
		setFocusOn(false);
		setType('adv');
		advIndex.current = idx;
	};

	const focusMove = (e, idx) => {
		if (e.key == 'Enter') {
			click(idx);
		}
	};

	return (
		<>
			<h2> TV COMMERCIALS </h2>
			<p>
				You may see ads in a few different places in YouTube TV, like when
				you're watching live TV
			</p>
			<div className='advs' ref={vids}>
				{adv.map((a, idx) => {
					return (
						<div
							className='adv-box'
							key={idx}
							onClick={() => click(idx)}
							onKeyDown={(e) => focusMove(e, idx)}
							tabIndex={0}>
							<img
								src={a.snippet.thumbnails.standard.url}
								alt={0 + `${3 + idx}` + 's advertisement'}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default YC_advertisement;
