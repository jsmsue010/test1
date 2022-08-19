import React, { useRef } from 'react';
import { path } from '../main/Main_content';

function PC_features() {
	const ref = useRef(null);
	let n = 0;
	let press = false;
	let st;
	let end;
	let nowPic = 0;
	const winWidth = window.innerWidth;

	const slideStart = (e) => {
		press = true;
		st = e.changedTouches[0].clientX;
	};
	const slideMove = (e) => {
		if (press) {
			ref.current.style.transition = 'auto';
			let now = e.changedTouches[0].clientX;
			let moving = st - now;
			const ratio = (moving / winWidth) * 100;
			if (moving > 0) {
				ref.current.style.marginLeft = `${nowPic * -85 - ratio}%`;
			} else if (moving < 0) {
				ref.current.style.marginLeft = `${nowPic * -85 - ratio}%`;
			}
		}
	};
	const slideEnd = (e) => {
		press = false;
		ref.current.style.transition = '0.5s';
		end = e.changedTouches[0].clientX;
		if (st - end > 50) {
			nowPic++;
			if (nowPic > 3) nowPic = 3;
		} else if (st - end < -50) {
			nowPic--;
			if (nowPic < 0) nowPic = 0;
		}
		ref.current.style.marginLeft = `${nowPic * -87}%`;
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
				onTouchStart={(e) => slideStart(e)}
				onTouchMove={(e) => slideMove(e)}
				onTouchEnd={(e) => slideEnd(e)}>
				{img.map((i, idx) => {
					return (
						<div className='box' key={idx}>
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
