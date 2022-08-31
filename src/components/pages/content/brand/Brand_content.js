import React from 'react';
import BC_map from './BC_map';
import BC_member from './BC_member';
import BC_team from './BC_team';
import BC_story from './BC_story';

function Brand_contetnt() {
	return (
		<article className='brand'>
			<h1 className='h'>brand page</h1>
			<div className='inner'>
				<section className='about' tabIndex={0}>
					<BC_story />
				</section>

				<section className='member' tabIndex={0}>
					<BC_member />
				</section>

				<section className='team' tabIndex={0}>
					<BC_team />
				</section>

				<section className='map' tabIndex={0}>
					<BC_map />
				</section>
			</div>
		</article>
	);
}

export default Brand_contetnt;
