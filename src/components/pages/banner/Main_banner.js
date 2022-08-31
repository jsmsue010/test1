import React, { useState, useRef } from 'react';
import Menu from '../../common/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { Anim } from '../../class/anime';
const path = process.env.PUBLIC_URL;

const imgs = [
	`${path}/img/spon_Moment.jpg`,
	`${path}/img/brandMoment.jpg`,
	`${path}/img/product3_Moment.jpg`,
	`${path}/img/brand2_Moment.jpg`,
];
const vids = [
	`${path}/img/product6.mp4`,
	`${path}/img/brand.mp4`,
	`${path}/img/product3.mp4`,
	`${path}/img/brand2.mp4`,
];

const title = [
	'TECHNOLOGY WITH STYLE',
	'A QUESTION OF STYLE',
	'DISCOVER YOUR STYLE',
	'BEYOUND THE STYLE',
];

const alt = [
	'product image1',
	'product image2',
	'product image3',
	'product image4',
];

function Main_banner() {
	const init = useRef(null);
	const visual = useRef(null);
	const index = useRef(0);
	const indexButton = useRef(null);

	const [flex, setFlex] = useState(false);
	const [mobile, setMoblie] = useState(false);

	let enable = true;

	useEffect(() => {
		getVw();
		window.addEventListener('resize', getVw);
		return () => window.removeEventListener('resize', getVw);
	}, []);

	function getVw() {
		matchMedia('screen and (max-width: 699px)').matches
			? setMoblie(true)
			: setMoblie(false);
	}

	useEffect(() => {
		setTimeout(() => {
			if (init.current) {
				const h1 = init.current.querySelectorAll('h1');
				h1[0].style.opacity = 1;
				h1[0].style.right = `20px`;
			}
		}, 100);
	}, []);

	const show = (n) => {
		const pics = visual.current.querySelectorAll('.pic');
		const pic = pics[n];
		pic.querySelector('img').style.opacity = 0;
		pic.querySelector('video').style.opacity = 1;
		pic.querySelector('video').play();
	};

	const pause = (n) => {
		const pics = visual.current.querySelectorAll('.pic');
		const pic = pics[n];
		if (!flex) {
			pic.querySelector('img').style.opacity = 0.3;
			pic.querySelector('video').style.opacity = 0;
			pic.querySelector('video').pause();
		}
	};

	const more = (n, b) => {
		const pics = visual.current.querySelectorAll('.pic');
		const pic = pics[n];
		if (b) {
			pics.forEach((n) => (n.style.flex = 0));
			pic.style.flex = 4;
			pic.querySelector('.box span').style.color = '#fff';
		} else {
			pics.forEach((n) => (n.style.flex = 1));
			pic.querySelector('.box span').style.color = '#111';
		}
	};

	let play = false;

	const vidPlay = (n) => {
		const pics = visual.current.querySelectorAll('.pic');
		const pic = pics[n];
		if (!play) {
			pic.querySelector('img').style.opacity = 0;
			pic.querySelector('video').style.opacity = 1;
			pic.querySelector('.box span').style.color = '#fff';
			pic.querySelector('video').play();
			play = true;
		} else {
			pic.querySelector('video').pause();
			pic.querySelector('img').style.opacity = 0.5;
			pic.querySelector('video').style.opacity = 0;
			pic.querySelector('.box span').style.color = '#111';
			play = false;
		}
	};

	const moving = (n) => {
		if (enable) {
			enable = false;
			const pics = visual.current.querySelectorAll('.pic');
			visual.current.style.marginLeft = '0%'; //위치 초기화. 이 코드가 없으면 위치를 이상하게 설정된채로 Anim이 실행된다.
			if (index.current - n > 0) {
				pics[n].style.left = '-33.33%';
				pics[n].style.opacity = '1';
				new Anim(visual.current, {
					prop: 'margin-left',
					value: '100%',
					duration: 500,
					callback: () => {
						visual.current.style.marginLeft = '0%';
						pics.forEach((_, idx) => {
							pics[idx].style.left = '0%';
							pics[idx].style.zIndex = 0;
							pics[idx].style.opacity = 0;
						});
						pics[n].style.opacity = '1';
						pics[n].style.zIndex = '2';
						enable = true;
						index.current = n;
					},
				});
			} else if (index.current - n < 0) {
				pics[n].style.left = '33.33%';
				pics[n].style.opacity = '1';
				new Anim(visual.current, {
					prop: 'margin-left',
					value: '-100%',
					duration: 500,
					callback: () => {
						visual.current.style.marginLeft = '0%';
						pics.forEach((_, idx) => {
							pics[idx].style.left = '0%';
							pics[idx].style.zIndex = 0;
							pics[idx].style.opacity = 0;
						});
						pics[n].style.opacity = '1';
						pics[n].style.zIndex = '2';
						enable = true;
						index.current = n;
					},
				});
			} else enable = true;
		} else {
			return;
		}
	};

	let start;

	let end;

	const touchSt = (e) => {
		start = e.changedTouches[0].clientX;
	};

	const touchEnd = (e) => {
		end = e.changedTouches[0].clientX;
		const move = start - end;
		if (move > 50) {
			let newIndex = index.current + 1;
			moving(newIndex == 4 ? 3 : newIndex);
		} else if (move < -50) {
			let newIndex = index.current - 1;
			moving(newIndex == -1 ? 0 : newIndex);
		}
	};

	const targetPlayBt = () => {
		const playBt = visual.current.querySelectorAll('button');
		playBt[index.current].focus();
	};
	const playBtKeyEvent = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			const bt = indexButton.current.querySelectorAll('button');
			bt[0].focus();
		}
		if (e.shiftKey && e.key === 'Tab') {
			e.preventDefault();
			init.current.focus();
		}
		if (e.key === 'Enter') vidPlay(index.current);
	};
	const indexBtKeyEvent = (e) => {
		const playBt = visual.current.querySelectorAll('button');
		if (e.shiftKey && e.key === 'Tab') {
			e.preventDefault();
			playBt[index.current].focus();
		}
	};

	return (
		<>
			<Menu />
			<div className='main_visual' ref={init} tabIndex={mobile ? 0 : null}>
				<h1>Chrome Kitchen</h1>
				<div className='wrapper' ref={visual}>
					{imgs.map((i, idx) => {
						return (
							<div
								className='pic'
								key={idx}
								onTouchStart={mobile ? (e) => touchSt(e) : null}
								onTouchEnd={mobile ? (e) => touchEnd(e) : null}
								onFocus={!mobile ? () => show(idx) : null}
								onBlur={!mobile ? () => pause(idx) : null}>
								<img src={i} alt={alt[idx]} />
								<video src={vids[idx]} muted loop />
								<div className='box'>
									<span
										tabIndex={!mobile ? 0 : null}
										onMouseEnter={!mobile ? () => show(idx) : null}
										onMouseLeave={!mobile ? () => pause(idx) : null}
										onClick={
											!mobile
												? () => {
														setFlex(!flex);
														more(idx, !flex);
												  }
												: null
										}
										onKeyDown={(e) => {
											if (e.key === 'Enter' && !mobile) {
												setFlex(!flex);
												more(idx, !flex);
											}
										}}>
										{title[idx]}
									</span>
									<button
										className='playBt'
										onKeyDown={playBtKeyEvent}
										onFocus={targetPlayBt}
										aria-label={'play button'}>
										<FontAwesomeIcon
											icon={faCirclePlay}
											className='circlePlay'
											onClick={() => vidPlay(idx)}
										/>
									</button>
								</div>
							</div>
						);
					})}
				</div>
				<div className='index' ref={indexButton}>
					{imgs.map((_, idx) => {
						return (
							<button
								className='indexBt'
								onClick={() => moving(idx)}
								key={idx}
								onKeyDown={idx === 0 ? indexBtKeyEvent : null}
								aria-label={`to video ${idx + 1}`}></button>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default Main_banner;
