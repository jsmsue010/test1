import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { path } from './Main_content';

function MC_section1() {
	const imgs1 = [
		`${path}/img/detail0.jpg`,
		`${path}/img/detail3.jpg`,
		`${path}/img/detail4.jpg`,
	];
	const alt1 = ['induction', 'small appliances in the room', 'stand mixer'];
	const title1 = [
		'DETAILS AND CHROMING',
		'MICROLIVING: SPACE-SAVING APPLIANCES',
		'THE ART OF COOKING',
	];
	const p1 = [
		`choose between classic and stainless steel and enamelled steal,
	glass and cooper.`,
		`For a confortable living, even in limited spaces.`,
		`All the necessary instruments to create magic in the kitchen`,
	];

	const imgs2 = [
		`${path}/img/detail2.jpg`,
		`${path}/img/product3.jpg`,
		`${path}/img/detail1.jpg`,
	];

	const alt2 = ['kitchen', 'steal kitchen', 'induction'];
	const title2 = [
		'CONNECTED HOUSEHOLD APPLIANCES',
		'AN INCREDIBLE RANGE OF MATERIALS AND COLORS',
		'AREA INDUCTION HOB: SAFETY AND FLEXIBILITY',
	];
	const p2 = [
		`The new generation of connected CHROME KITCHEN appliances.`,
		`
	Glass, stainless steel, copper and a palette of 13 enamel colours:
	how and why the choice of materials matters.`,
		`To cook with practicality and safety, without giving up an elegant
	contemporary design`,
	];

	const box1 = useRef(null);
	const box2 = useRef(null);

	const allRef = useRef(null);

	const [mobile, setMoblie] = useState(false);

	useEffect(() => {
		getVw();
		window.addEventListener('resize', getVw);
		return () => window.removeEventListener('resize', getVw);
	}, []);

	function getVw() {
		matchMedia('screen and (max-width: 699px)').matches
			? setMoblie(true)
			: setMoblie(false);
	}

	useEffect(() => {
		if (allRef && mobile) {
			const refs = allRef.current.querySelectorAll('.section1-box');

			const io1 = new IntersectionObserver((entry) => {
				if (entry[0].isIntersecting) {
					entry[0].target.style.opacity = 1;
					entry[0].target.parentElement.style.transform = 'translateY(0%)';
					entry[0].target.style.transform = 'translateX(0%)';
				}
			});

			refs.forEach((r, idx) => {
				io1.observe(r);
			});
		}
		if (box1 && box2 && !mobile) {
			const io = new IntersectionObserver((entry) => {
				if (entry[0].isIntersecting) {
					entry[0].target.style.transform = 'translateY(-20%)';
				}
			});

			io.observe(box1.current);
			io.observe(box2.current);
		}
	}, [mobile]);

	const animation = (e) => {
		console.log(e.target);
		e.target.style.opacity = 1;
		e.target.style.transform = 'translateX(0%)';
	};

	return (
		<div ref={allRef}>
			<h2>ABOUT CHROME KITCHEN</h2>
			<h3>PRODUCT</h3>

			<div className='box' ref={box1}>
				{imgs1.map((i, idx) => {
					return (
						<div
							key={idx}
							className='section1-box '
							tabIndex={0}
							onFocus={animation}>
							<img src={i} alt={alt1[idx]} />
							<h4>{title1[idx]}</h4>
							<p>{p1[idx]}</p>
						</div>
					);
				})}
			</div>

			<div
				className='box'
				ref={box2}
				tabIndex={0}
				onFocus={(e) => (e.currentTarget.style.transform = 'translateY(-20%)')}>
				{imgs2.map((i, idx) => {
					return (
						<div
							key={idx}
							className='section1-box '
							tabIndex={0}
							onFocus={animation}>
							<img src={i} alt={alt2[idx]} />
							<h4>{title2[idx]}</h4>
							<p>{p2[idx]}</p>
						</div>
					);
				})}
			</div>

			<a href='/brand' className='link-brand'>
				view more <FontAwesomeIcon icon={faArrowRightLong} />
			</a>
		</div>
	);
}

export default MC_section1;
