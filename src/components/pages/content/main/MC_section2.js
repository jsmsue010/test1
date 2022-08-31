import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { path } from './Main_content';
import { useEffect } from 'react';
import { Slide } from '../../../class/slide';

function MC_section2() {
	const img = useRef(null);
	const link = useRef(null);

	useEffect(() => {
		setTimeout(() => {
			if (link.current) {
				const io = new IntersectionObserver((entry) => {
					if (entry[0].isIntersecting) {
						link.current.style.left = '0';
					}
				});
				io.observe(link.current);
			}
		}, 100);
	}, []);

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

	let press = false;

	const slide = new Slide(350, 85, 3);

	const touchStart = (e) => {
		press = true;
		const first = e.changedTouches[0].clientX;
		slide.start = first;
	};

	const touchMove = (e) => {
		if (press) {
			const now = e.changedTouches[0].clientX;
			img.current.style.marginLeft = `${slide.slideMove(now)}%`;
		}
	};
	const touchEnd = (e) => {
		press = false;
		const end = e.changedTouches[0].clientX;
		img.current.style.marginLeft = `${slide.slideEnd(end)}%`;
	};

	const focusMove = (idx) => {
		if (window.innerWidth < 500) img.current.style.marginLeft = `${idx * -85}%`;
	};

	return (
		<>
			<h2>BEYOND THE KITCHEN</h2>
			<h3>BRAND STORY</h3>

			<div className='case'>
				<div
					className='wrap'
					draggable='true'
					ref={img}
					onTouchStart={(e) => touchStart(e)}
					onTouchEnd={(e) => touchEnd(e)}
					onTouchMove={(e) => touchMove(e)}>
					{imgPath.map((i, idx) => {
						return (
							<div
								className='section2-box'
								//role='article'
								draggable='true'
								key={idx}
								tabIndex={0}
								onFocus={() => focusMove(idx)}>
								<img src={i} alt={alt[idx]} />
								<h4>{title[idx]}</h4>
							</div>
						);
					})}
				</div>

				<div className='linkWrapper'>
					<a href='/product' ref={link}>
						view more <FontAwesomeIcon icon={faArrowRightLong} />
					</a>
				</div>
			</div>
		</>
	);
}

export default MC_section2;
