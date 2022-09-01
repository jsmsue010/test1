import React, { useState, useEffect, useRef } from 'react';
import BDC_update from './BDC_update';
import BDC_delete from './BDC_delete';

function BDC_read({ data, setData }) {
	const [open, setOpen] = useState(false);
	const [val, setVal] = useState();
	const [index, setIndex] = useState(null);
	const [height, setHeight] = useState(0);
	const [update, setUpdate] = useState(false);

	const hiddenBox = useRef(null);

	useEffect(() => {
		if (hiddenBox.current) hiddenBox.current.style.height = `${height}px`;
	});

	const handleOpen = (e, idx) => {
		const innerText = e.currentTarget.children[0].innerText;
		if (innerText === '-') {
			setHeight(0);
			hiddenBox.current.style.marginTop = 0;
			hiddenBox.current.style.marginBottom = 0;
			setTimeout(() => setOpen(false), 500);
		} else {
			setOpen(idx);
			setTimeout(() => setHeight(300), 100);
		}
	};

	const edit = (idx) => {
		setUpdate(true);
		setVal(data[idx]);
		setIndex(idx);
	};

	return (
		<>
			{data.map((d, idx) => {
				return (
					<React.Fragment key={idx}>
						<div
							className='box'
							tabIndex={0}
							onClick={(e) => {
								handleOpen(e, idx);
								setUpdate(false);
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleOpen(e, idx);
									setUpdate(false);
								}
							}}>
							<React.Fragment key={idx}>
								<span>{open === idx ? `-` : `+`}</span>
								<h2>{d.title}</h2>
							</React.Fragment>
						</div>
						{open === idx ? (
							<div className='hidden_box' ref={hiddenBox} tabIndex={0}>
								{update ? (
									<BDC_update
										index={index}
										val={val}
										data={data}
										setData={setData}
										setUpdate={setUpdate}
										setHeight={setHeight}>
										<BDC_delete
											data={data}
											setData={setData}
											idx={index}
											setHeight={setHeight}
											setOpen={setOpen}
										/>
									</BDC_update>
								) : (
									<p>{d.text}</p>
								)}
								{update ? null : (
									<div className='buttonWrap'>
										<button
											onClick={() => {
												edit(idx);
											}}>
											edit
										</button>
										<button
											className='close'
											onClick={() => {
												setHeight(0);
												setTimeout(() => setOpen(false), 500);
											}}>
											close
										</button>
									</div>
								)}
							</div>
						) : null}
					</React.Fragment>
				);
			})}
		</>
	);
}
export default BDC_read;
