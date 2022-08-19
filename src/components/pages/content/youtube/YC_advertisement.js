import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function YC_advertisement({ adv, setIndex, setYoutube }) {
	return (
		<>
			<h2> TV COMMERCIALS </h2>
			<p>
				You may see ads in a few different places in YouTube TV, like when
				you're watching live TV
			</p>
			<div className='advs'>
				{adv.map((a, idx) => {
					return (
						<div
							className='adv-box'
							key={idx}
							onClick={() => {
								setIndex(idx + 3);
								setYoutube('ads');
							}}>
							<h3>{0 + `${3 + idx}` + "'s"}</h3>
							<img
								src={a.snippet.thumbnails.standard.url}
								alt={0 + `${3 + idx}` + 's advertisement'}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default YC_advertisement;
