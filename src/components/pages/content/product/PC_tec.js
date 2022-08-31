import React, { useState } from 'react';
import { path } from '../main/Main_content';

function PC_tec() {
	const textArr = [
		`1 Year of dedicated care`,
		`Planned maintenance program`,
		`Repairing service: whenever and wherever you want.`,
	];
	const img = [
		`${path}/img/service1.jpg`,
		`${path}/img/service2.jpg`,
		`${path}/img/service3.jpg`,
	];

	const [text, setText] = useState(0);
	return (
		<div className='wrapper'>
			{textArr.map((t, idx) => {
				return (
					<div
						className='box'
						key={idx}
						onClick={() => setText(idx)}
						onFocus={() => setText(idx)}
						tabIndex={0}>
						<img src={img[idx]} alt={t} />
						<div
							className='mob'
							style={
								text === idx ? { border: '2px solid orange' } : null
							}></div>
						<h4>{t}</h4>
					</div>
				);
			})}

			<div className='mobText'>{textArr[text]}</div>

			<div id='mail'>
				<p>Sign up to our product newsletter</p>
				<form action='#' id='mailForm'>
					<fieldset>
						<legend className='h'>메일링 신청</legend>
						<div>
							<input
								type='text'
								id='mailBox'
								placeholder='your Email'
								required
							/>
							<input type='submit' id='submit' value='submit' />
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	);
}

export default PC_tec;
