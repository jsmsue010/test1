import React, { useState, useEffect, useRef } from 'react';
import Popup from '../../../common/Popup';
import { useSelector } from 'react-redux';
import YC_advertisement from './YC_advertisement';
import YC_sponsorship from './YC_sponsorship';
import YC_photos from './YC_photos';

function Youtube_content() {
	const vid = useSelector((state) => state.youtubeReducer.youtube);
	console.log(vid);
	const pop = useRef(null);

	//	const [ele, setEle] = useState(null);
	const [sps, setSps] = useState([]);
	const [adv, setAdv] = useState([]);

	//const [open, setOpen] = useState(false);
	//const [index, setIndex] = useState(0);
	const [youtube, setYoutube] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		console.log(vid);
		if (vid) {
			setSps(vid.slice(3, 6));
			setAdv(vid.slice(0, 3));
		}
	}, [vid]);

	useEffect(() => {
		console.log('youtube: ', youtube);
	}, [youtube]);
	return (
		<article className='youtube'>
			<h1 className='hidden'> youtube page</h1>
			<div className='inner'>
				<section className='advertisement' tabIndex={0}>
					<YC_advertisement
						adv={adv}
						//setOpen={setOpen}
						setYoutube={setYoutube}
						setIndex={setIndex}
					/>
				</section>

				<section className='sponsorship' tabIndex={0}>
					<YC_sponsorship
						sps={sps}
						//setOpen={setOpen}
						setYoutube={setYoutube}
						setIndex={setIndex}
					/>
				</section>

				<section className='photos' tabIndex={0}>
					<YC_photos />
				</section>
			</div>
			{/*{open ? (
				<Popup ref={pop} open={open} setOpen={setOpen} >*/}
			{youtube ? (
				<Popup ref={pop} youtube={youtube} setYoutube={setYoutube}>
					<iframe
						src={
							`https://www.youtube.com/embed/` +
							vid[index].snippet.resourceId.videoId
						}
						frameBorder='0'></iframe>
					<span
						onClick={() => {
							pop.current.close();
						}}>
						close
					</span>
					{/* 클릭이벤트로 setOn(false)를 호출하면 open의 값이 false가 되고, 팝업컴포넌트가 null로 변해서 팝업창 사라지는 모션이 실행되지 않음., */}
				</Popup>
			) : null}
		</article>
	);
}

export default Youtube_content;
