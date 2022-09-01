import React, { useState, useEffect, useRef } from 'react';

function BDC_create({ data, setData }) {
	const input = useRef(null);
	const textarea = useRef(null);
	const [write, setWrite] = useState(false);

	const create = (e) => {
		const title = input.current.value.trim();
		const text = textarea.current.value.trim();
		if ((title && text) === '') {
			alert('내용을 입력해주세요');
			return;
		}
		const newObj = { title: title, text: text };
		setData([newObj, ...data]);
		input.current.value = '';
		textarea.current.value = '';
		setWrite(false);
	};

	return (
		<div>
			{write ? null : (
				<p className='writeWrap'>
					Still need help? send a note us!
					<button onClick={() => setWrite(true)}>WRITE</button>
				</p>
			)}
			{write && (
				<div className='writeBox'>
					<div className='title'>
						<label htmlFor='title'>title: </label>
						<input type='text' name='title' ref={input} />
					</div>
					<div className='text'>
						<label htmlFor='text'>text: </label>
						<textarea name='text' cols='30' rows='10' ref={textarea}></textarea>
					</div>
					<div className='buttonWrap'>
						<button onClick={create}>create</button>
						<button onClick={() => setWrite(false)}>cancel</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default BDC_create;
