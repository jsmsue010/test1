import React, { useRef } from 'react';
import { Slide } from '../../../class/slide';
import { path } from '../main/Main_content';

function PC_features() {
	const ref = useRef(null);
	let press = false;

	const slide = new Slide(350, 87, 4);

	const touchStart = (e) => {
		if (window.innerWidth < 550) {
			press = true;
			const first = e.changedTouches[0].clientX;
			slide.start = first;
		}
	};
	const touchMove = (e) => {
		if (press) {
			ref.current.style.transition = 'auto';
			const now = e.changedTouches[0].clientX;
			ref.current.style.marginLeft = `${slide.slideMove(now)}%`;
		}
	};
	const touchEnd = (e) => {
		press = false;
		ref.current.style.transition = '0.5s';
		const end = e.changedTouches[0].clientX;
		ref.current.style.marginLeft = `${slide.slideEnd(end)}%`;
	};
	const focusMove = (idx) => {
		if (window.innerWidth < 550) ref.current.style.marginLeft = `${idx * -87}%`;
	};

	const img = [
		`${path}/img/product6.png`,
		`${path}/img/product4.jpg`,
		`${path}/img/product2.jpg`,
		`${path}/img/product5.jpg`,
	];
	const alt = [
		`silver stove`,
		`squre shape kitchen appliences`,
		`hand mixer`,
		`shining stove`,
	];
	const title = [
		`A QUESTION OF STYLE`,
		`CLEAN LINES AND RIGOROUS LOGIC`,
		`MANAGING EACH PREPARATION WITH SIMPLICITY`,
		`GLOSSY FINISH`,
	];
	const text = [
		`
	Every collection has a soul. Which recounts a very personal
	experience - that of the person who lives with it.`,
		`
	translate into the pleasure of living and working in a
	well-organised, functional and yet not austere kitchen. you can
	make the most of your space`,
		`
	In these mechanical and laborious procedures, to achieve
	excellence, it is better to help our hands`,
		`perfect to catalyze as much light as possible in the kitchen`,
	];

	return (
		<div className='slide'>
			<h3 className='hidden'>features</h3>
			<div
				className='wrapper'
				ref={ref}
				onTouchStart={(e) => touchStart(e)}
				onTouchMove={(e) => touchMove(e)}
				onTouchEnd={(e) => touchEnd(e)}>
				{img.map((i, idx) => {
					return (
						<div
							className='box'
							key={idx}
							tabIndex={0}
							onFocus={() => focusMove(idx)}>
							<img src={i} alt={alt[idx]} />
							<h4>{title[idx]}</h4>
							<p>{text[idx]}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PC_features;
