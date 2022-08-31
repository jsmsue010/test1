import React, { useRef } from 'react';

function BDC_update({
	children,
	index,
	val,
	data,
	setData,
	setUpdate,
	setHeight,
}) {
	const input = useRef(null);
	const textarea = useRef(null);

	const update2 = (index) => {
		const newData = data.map((d, idx) => {
			//새로운 배열을 만들어서
			if (index === idx) {
				d = { title: input.current.value, text: textarea.current.value }; //업데이트 해주고
				console.log(d);
			}
			return d; //반환
		});
		console.log(newData);
		setData(newData); //set.
		setUpdate(false);
	};

	return (
		<>
			<div className='writeBox'>
				<div className='title'>
					<label htmlFor='title'>title: </label>
					<input
						type='text'
						name='title'
						ref={input}
						defaultValue={' ' + val.title}></input>
				</div>

				<div className='text'>
					<label htmlFor='text'>text: </label>
					<textarea
						name='text'
						id=''
						cols='30'
						rows='5'
						ref={textarea}
						defaultValue={' ' + val.text}></textarea>
				</div>

				<div className='buttonWrap'>
					{children}
					<button
						onClick={() => {
							update2(index);
							setHeight(300);
						}}>
						save
					</button>
					<button
						onClick={() => {
							setUpdate(false);
							setHeight(300);
						}}>
						cancel
					</button>
				</div>
			</div>
		</>
	);
}

export default BDC_update;
