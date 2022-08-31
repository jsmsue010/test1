import React from 'react';
import Menu from '../../common/Menu';

function Pages_banner({ src, pageName }) {
	return (
		<>
			<Menu></Menu>
			<div className='banner'>
				<div className='text-wrap'>
					<h1>{pageName}</h1>
					<p>
						Lorem ipsum dolor sit amet consecte adipisicing elit. Numquam
						aliquid, incidunt magni alias saepe quidem
					</p>
				</div>
			</div>
			<img className='banner-image' src={src} alt='' />
		</>
	);
}

export default Pages_banner;
