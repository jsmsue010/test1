import React, { useState, useEffect } from 'react';
import Popup from '../../../common/Popup';
import { useSelector } from 'react-redux';
import YC_advertisement from './YC_advertisement';
import YC_sponsorship from './YC_sponsorship';
import YC_photos from './YC_photos';

function Youtube_content() {
	const vid = useSelector((state) => state.youtubeReducer.youtube);
	console.log(vid);

	//	const [ele, setEle] = useState(null);
	const [sps, setSps] = useState([]);
	const [adv, setAdv] = useState([]);

	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const [focusOn, setFocusOn] = useState(false);
	const [type, setType] = useState('');

	useEffect(() => {
		console.log(vid);
		if (vid) {
			setSps(vid.slice(3, 6));
			setAdv(vid.slice(0, 3));
		}
	}, [vid]);

	return (
		<article className='youtube'>
			<h1 className='hidden'> youtube page</h1>
			<div className='inner'>
				<section className='advertisement' tabIndex={0}>
					<YC_advertisement
						adv={adv}
						setOpen={setOpen}
						setIndex={setIndex}
						focusOn={focusOn}
						setFocusOn={setFocusOn}
						setType={setType}
					/>
				</section>

				<section className='sponsorship' tabIndex={0}>
					<YC_sponsorship
						sps={sps}
						setOpen={setOpen}
						setIndex={setIndex}
						focusOn={focusOn}
						setFocusOn={setFocusOn}
						setType={setType}
					/>
				</section>

				<section className='photos' tabIndex={0}>
					<YC_photos />
				</section>
			</div>
			{open ? (
				<Popup setOpen={setOpen} setFocusOn={setFocusOn} type={type}>
					<iframe
						aria-label={'youtube video'}
						src={
							`https://www.youtube.com/embed/` +
							vid[index].snippet.resourceId.videoId
						}
						frameBorder='0'
						tabIndex={0}></iframe>
				</Popup>
			) : null}
		</article>
	);
}

export default Youtube_content;
