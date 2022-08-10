import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { path } from './Main_content';
import { useEffect } from 'react';

function MC_section2() {
	const img = useRef(null);
	const link = useRef(null);

	useEffect(() => {
		if (link) {
			const io = new IntersectionObserver((entry) => {
				if (entry[0].isIntersecting) {
					entry[0].target.style.width = '100%';
				}
			});
			io.observe(link.current);
		}
	}, []);

	let press = false;
	let s;
	let n = 0;

	const imgPath = [
		`${path}/img/brand3.jpg`,
		`${path}/img/brand4.jpg`,
		`${path}/img/brand2.jpg`,
	];
	const alt = ['eco-company', "a man who's cooking", 'cleaning system'];
	const title = [
		'ECOFRIENDLY PRODUCTS',
		'HOME OFFICE: MAKE YOUR WORK SMART',
		' SENSE.Klean',
	];

	const touchMove = (e) => {
		if (press) {
			const now = e.changedTouches[0].clientX;
			const move = s - now;
			const ratio = (-move / 350) * 100;
			img.current.style.marginLeft = `${n * 85 + ratio}%`;
		}
	};
	const touchEnd = (e) => {
		press = false;
		const end = e.changedTouches[0].clientX;
		if (s - end > 40) {
			n--;
			if (n < -2) n = -2;
		} else if (s - end < -40) {
			n++;
			if (n > 0) n = 0;
		}
		img.current.style.marginLeft = `${n * 85}%`;
	};

	return (
		<>
			<h1>BEYOND THE KITCHEN</h1>
			<h2>BRAND STORY</h2>

			<div className='case'>
				<div
					className='wrap'
					draggable='true'
					ref={img}
					onTouchStart={(e) => {
						press = true;
						s = e.changedTouches[0].clientX;
					}}
					onTouchEnd={(e) => touchEnd(e)}
					onTouchMove={(e) => touchMove(e)}>
					{imgPath.map((i, idx) => {
						return (
							<div
								className='section2-article'
								role='article'
								draggable='true'
								key={idx}
								tabIndex={0}>
								<img src={i} alt={alt[idx]} />
								<h3>{title[idx]}</h3>
							</div>
						);
					})}
				</div>

				<div className='linkWrapper'>
					<a href='/brand' ref={link}>
						view more <FontAwesomeIcon icon={faArrowRightLong} />
					</a>
				</div>
			</div>
		</>
	);
}

export default MC_section2;
