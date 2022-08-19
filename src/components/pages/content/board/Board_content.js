import React, { useState, useEffect, useRef } from 'react';

function Board_content() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [data, setData] = useState([]);
	const [index, setIndex] = useState(null);
	const [open, setOpen] = useState(false);
	const [write, setWrite] = useState(false);
	const [update, setUpdate] = useState(false);
	const [val, setVal] = useState();

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('posts'));
		if (data) setData(data);
	}, []);
	useEffect(() => {
		if (data) localStorage.setItem('posts', JSON.stringify(data));
	}, [data]);

	useEffect(() => {
		console.log(index);
	}, [index]);

	const create = (e) => {
		const title = input.current.value.trim();
		console.log(title);
		const text = textarea.current.value.trim();
		console.log(text);
		if ((title && text) === '') {
			alert('내용을 입력해주세요');
			return;
		}
		const newObj = { title: title, text: text };
		setData([newObj, ...data]);
		console.log(data);
		input.current.value = '';
		textarea.current.value = '';
		setWrite(false);
	};

	const del = (index) => {
		const newData = data.filter((_, idx) => idx !== index);
		console.log(newData);
		setData(newData);
	};

	const update2 = (index) => {
		console.log(data);
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
	const handleOpen = (e, idx) => {
		const innerText = e.currentTarget.children[0].innerText;
		console.log(idx);
		if (innerText === '-') {
			setOpen(false);
		} else {
			setOpen(idx);
		}
	};
	const edit = (idx) => {
		setUpdate(true);
		//console.log(data[idx]);
		setVal(data[idx]);
		setIndex(idx);
	};

	return (
		<article className='board'>
			<h1>Q&amp;A</h1>
			<p className='intro'>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. IpsNumquam
				aliquid, incidunt magni alias saepe quidem
			</p>
			<div className='inner'>
				{data.map((d, idx) => {
					return (
						<React.Fragment key={idx}>
							<div
								className='box'
								tabIndex={0}
								onClick={(e) => {
									//setIndex(idx);
									handleOpen(e, idx);
								}}>
								<React.Fragment key={idx}>
									<span>{open === idx ? `-` : `+`}</span>
									<h2>{d.title}</h2>
								</React.Fragment>
							</div>
							{open === idx ? (
								<div className='hidden_box'>
									{update ? (
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
													rows='10'
													ref={textarea}
													defaultValue={' ' + val.text}></textarea>
											</div>

											<div className='buttonWrap'>
												<button onClick={() => update2(index)}>save</button>
												<button onClick={() => setUpdate(false)}>cancel</button>
											</div>
										</div>
									) : (
										<>
											<p>{d.text}</p>
											<div className='buttonWrap'>
												<button
													onClick={() => {
														edit(idx);
													}}>
													edit
												</button>
												<button
													onClick={() => {
														setIndex(idx);
														del(idx);
													}}>
													delete
												</button>
											</div>
										</>
									)}
								</div>
							) : null}
						</React.Fragment>
					);
				})}
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
							<textarea
								name='text'
								cols='30'
								rows='10'
								ref={textarea}></textarea>
						</div>
						<div className='buttonWrap'>
							<button onClick={create}>create</button>
							<button onClick={() => setWrite(false)}>cancel</button>
						</div>
					</div>
				)}
			</div>
		</article>
	);
}

export default Board_content;
