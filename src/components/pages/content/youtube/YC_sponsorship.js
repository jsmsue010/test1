import React, { useEffect, useRef } from 'react';

function YC_sponsorship({
	sps,
	setOpen,
	setIndex,
	focusOn,
	setFocusOn,
	setType,
}) {
	const vids = useRef(null);
	//const vidIndex = useRef(0);
	let vidIndex = 0;

	useEffect(() => {
		if (vids.current) {
			const io = new IntersectionObserver((entry) => {
				console.log('?');
				if (entry[0].isIntersecting) {
					const spsBox = vids.current.querySelectorAll('.sps-box');
					console.log(spsBox);
					spsBox.forEach((s) => (s.style.opacity = `1`));
				}
			});
			io.observe(vids.current);
		}
	}, []);

	useEffect(() => {
		if (focusOn === 'sps') {
			const sps = vids.current.querySelectorAll('.sps-box');
			//sps[vidIndex.current].focus();
			console.log(sps[vidIndex]);
		}
	}, [focusOn]);

	const click = (idx) => {
		setIndex(3 + idx);
		setOpen(true);
		setFocusOn(false);
		setType('sps');
		//vidIndex.current = idx;
		vidIndex = idx;
		console.log(vidIndex);
	};

	const focusMove = (e, idx) => {
		if (e.key == 'Enter') {
			click(e, idx);
		}
	};

	return (
		<>
			<h2>TV PROGRAM</h2>
			<p>
				we sponsored a TV show with our kitchen appliances. check the youtube
				and our product
			</p>
			<div ref={vids}>
				{sps.map((m, idx) => {
					return (
						<div
							className='sps-box'
							key={idx}
							onClick={() => click(idx)}
							onKeyDown={(e) => focusMove(e, idx)}
							tabIndex={0}>
							<img
								src={m.snippet.thumbnails.standard.url}
								alt={`tv show` + (idx + 1)}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default YC_sponsorship;
