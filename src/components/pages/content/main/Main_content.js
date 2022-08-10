import React, { useEffect, useRef, useState } from 'react';
import MC_section1 from './MC_section1';
import MC_section2 from './MC_section2';
import MC_slogan from './MC_slogan';
import MC_section3 from './MC_section3';
import MC_section4 from './MC_section4';

export const path = process.env.PUBLIC_URL;

function Main_content() {
	return (
		<div className='inner'>
			<section className='brandInfo1' tabIndex={0}>
				<MC_section1 />
			</section>

			<section className='brandInfo2' tabIndex={0}>
				<MC_section2 />
			</section>

			<section className='brandInfo3' tabIndex={0}>
				<MC_section3 />
			</section>

			<MC_slogan />

			<section className='brandInfo4' tabIndex={0}>
				<MC_section4 />
			</section>
		</div>
	);
}

export default Main_content;
