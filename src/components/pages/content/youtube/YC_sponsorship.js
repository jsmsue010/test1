import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

function YC_sponsorship({ sps, setYoutube, setIndex }) {
	const [vidIndex, setVidIndex] = useState(0);
	return (
		<>
			<h2>TV PROGRAM</h2>
			<p>
				we sponsored a TV show with our kitchen appliances. check the youtube
				and our product
			</p>
			{sps.map((m, idx) => {
				return (
					<div className='sps-box' key={idx}>
						<img
							src={m.snippet.thumbnails.standard.url}
							onClick={() => {
								setIndex(idx);
								setVidIndex(idx);
								setYoutube(true);
							}}
						/>
					</div>
				);
			})}
		</>
	);
}

export default YC_sponsorship;
