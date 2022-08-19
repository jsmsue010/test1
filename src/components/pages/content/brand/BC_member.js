import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { path } from '../main/Main_content';

function BC_member() {
	const [members, setMember] = useState([]);
	useEffect(() => {
		axios
			.get(`${path}/DB/member.json`)
			.then((json) => setMember(json.data.data));
	}, []);

	return (
		<>
			<h2>MEMBER</h2>
			<ul className='list'>
				{members.map((a, idx) => {
					return (
						<li key={idx}>
							<img src={`${path}/img/${a.pic}`} alt='' />
							<div className='box'>
								<p>{a.name}</p>
								<p>{a.position}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default BC_member;
