import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { path } from './Main_content';

function MC_section3() {
	const imgSize = useRef(null);
	useEffect(() => {
		if (imgSize) {
			const io = new IntersectionObserver((entry) => {
				if (entry[0].isIntersecting) {
					entry[0].target.style.width = '100%';
				}
			});
			io.observe(imgSize.current);
		}
	}, []);

	return (
		<div className='wrap'>
			<h2>PROJECTS OF ART</h2>
			<img src={`${path}/img/chrome_banner2.jpg`} ref={imgSize} />
			<p>
				the worlds of high design and fashion meet and merge with chrome kitchen
				to create unique domestic appliances
			</p>

			<a href='/gallery'>
				view more <FontAwesomeIcon icon={faArrowRightLong} />
			</a>
		</div>
	);
}

export default MC_section3;
