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
				{members.map((m, idx) => {
					return (
						<li key={idx} tabIndex={0}>
							<img src={`${path}/img/${m.pic}`} alt={m.name} />
							<div className='box'>
								<p>{m.name}</p>
								<p>{m.position}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default BC_member;
