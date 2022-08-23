import React from 'react';
import Menu from '../../common/Menu';

const path = process.env.PUBLIC_URL;
function Brand_banner() {
	return (
		<>
			<Menu></Menu>
			<div className='banner'>
				<div className='text-wrap'>
					<h1>BRAND</h1>
					<p>
						Lorem ipsum dolor sit amet consecte adipisicing elit. Numquam
						aliquid, incidunt magni alias saepe quidem
					</p>
				</div>
			</div>
			<img className='banner-image' src={`${path}/img/banner12.jpg`} alt='' />
		</>
	);
}

export default Brand_banner;
