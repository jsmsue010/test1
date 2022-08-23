import React from 'react';
import PC_features from './PC_features';
import PC_tec from './PC_tec';
import { path } from '../main/Main_content';

function Product_content() {
	const img = [
		`${path}/img/black.jpg`,
		`${path}/img/gray2.jpg`,
		`${path}/img/gray.jpg`,
		`${path}/img/ivory.jpg`,
	];
	const alt = ['black color', 'gray2 color', 'gray1 color', 'ivory color'];
	const text = [
		`PANTONE 4287`,
		`PANTONE COOLGRAY 10`,
		`PANTONE COOLGRAY 11 C`,
		`PANTONE 9224 C`,
	];
	return (
		<article className='product'>
			<h1 className='hidden'>product page</h1>
			<div className='inner'>
				<section>
					<h2 className='hidden'>product features</h2>
					<p className='intro'>
						A complete offering for high technology collections, articulated in
						a rich palette of colours which, alongside white and black, ranges
						over sorbet colours, metallic tones and classic saturated colours.
					</p>

					<PC_features />

					<div className='color-list'>
						<h3>SIGNATURE COLOR</h3>
						<ul>
							{img.map((i, idx) => {
								return (
									<li key={idx}>
										<div className='img-wrap'>
											<img src={i} alt={alt[idx]} />
										</div>
										<div className='shape' />
										<p>{text[idx]}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				<section>
					<h2>TECHNICAL SERVICES</h2>
					<img className='tec-img' src={`${path}/img/banner4.jpg`} alt='' />
					<p className='intro'>
						With the Preventive Maintenance program to take care of your oven by
						our most qualified service partners, you will be prepared for every
						upcoming business opportunity!
					</p>

					<PC_tec />
				</section>
			</div>
		</article>
	);
}

export default Product_content;
