import React, { useEffect, useRef } from 'react';

function MC_slogan() {
	const slogan = useRef();

	useEffect(() => {
		const io = new IntersectionObserver((entry) => {
			if (entry[0].isIntersecting) {
				window.addEventListener('scroll', getScr);
			} else {
				window.removeEventListener('scroll', getScr);
			}
		});
		io.observe(slogan.current);

		return () => {
			window.removeEventListener('scroll', getScr);
		};
	}, []);

	const getScr = () => {
		const scrStart = slogan.current.offsetTop;
		const scr = window.scrollY;
		const len = window.innerHeight;
		//console.log(scr);
		const ratio = ((scr - scrStart) / len) * 65;
		console.log(ratio);
		move(ratio);
	};

	const move = (n) => {
		slogan.current.style.marginLeft = `${10 - n}%`;
	};

	return (
		<>
			<p className='slogan' ref={slogan}>
				Lorem ipsum dolor, sit amet.
			</p>
		</>
	);
}

export default MC_slogan;
