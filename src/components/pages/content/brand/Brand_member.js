import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { path } from '../main/Main_content';

function Brand_member() {
	const [members, setMember] = useState([]);
	useEffect(() => {
		axios
			.get(`${path}/DB/member.json`)
			.then((json) => setMember(json.data.data));
	}, []);

	//console.log(member);

	return (
		<div className='member'>
			<div className='list'>
				<p>MEMBER</p>
				{members.map((a, idx) => {
					return (
						<article key={idx}>
							<img src={`${path}/img/${a.pic}`} alt='' />
							<div className='box'>
								<p>{a.name}</p>
								<p>{a.position}</p>
							</div>
						</article>
					);
				})}
			</div>
		</div>
	);
}

export default Brand_member;
