import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Anim } from '../../../class/anime';
import { path } from '../main/Main_content';

function YC_photos() {
	const slide = useRef(null);
	const [idx, setIdx] = useState(false);
	const [imgs, setImgs] = useState();
	const mobile = useRef(false);

	let click = true;
	let img;

	useEffect(() => {
		if (slide) {
			setImgs(slide.current.querySelectorAll('img'));
		}
	}, [slide]);

	useEffect(() => {
		getVw();
		window.addEventListener('resize', getVw);
		return () => {
			window.removeEventListener('resize', getVw);
		};
	}, []);

	function getVw() {
		const imgs = slide.current.querySelectorAll('img');
		if (matchMedia('screen and (max-width: 549px)').matches) {
			slide.current.style.marginLeft = 0;
			imgs.forEach((e) => e.classList.remove('on'));
			imgs[0].classList.add('on');
			setIdx(0);
			mobile.current = true;
		} else {
			mobile.current = false;
			slide.current.style.marginLeft = 'auto';
		}
	}

	const index = (n) => {
		let num;
		if (idx - n > 0) {
			num = 1;
		} else if (idx - n < 0) {
			num = -1;
		} else return;

		new Anim(imgs[idx], {
			prop: 'left',
			value: `${100 * num}%`,
			duration: 500,
			callback: () => {
				imgs[idx].style.left = 0;
				imgs[idx].classList.remove('on');
			},
		});

		imgs[n].classList.add('on');
		imgs[n].style.left = num > 0 ? '-100%' : '200%';
		new Anim(imgs[n], {
			prop: 'left',
			value: 0,
			duration: 500,
			callback: () => {},
		});
	};

	const next = () => {
		if (matchMedia('screen and (max-width: 549px)').matches) {
			if (!click) return;
			click = false;
			new Anim(imgs[idx], {
				prop: 'margin-left',
				value: '100%',
				duration: 400,
				callback: () => {
					imgs[idx].classList.remove('on');
					imgs[idx].style.marginLeft = 0;
				},
			});
			if (idx == 0) {
				imgs[6].classList.add('on');
				imgs[6].style.left = '-100%';
				new Anim(imgs[6], {
					prop: 'left',
					value: 0,
					duration: 400,
					callback: () => {
						click = true;
						setIdx(6);
					},
				});
			} else {
				imgs[idx - 1].classList.add('on');
				imgs[idx - 1].style.left = '-100%';
				new Anim(imgs[idx - 1], {
					prop: 'left',
					value: 0,
					duration: 400,
					callback: () => {
						click = true;
						setIdx(idx - 1);
					},
				});
			}
		} else {
			//  width 549px를 넘으면
			if (slide.current.style.marginLeft === 'auto') {
				slide.current.style.marginLeft = '-33%';
			}

			if (!click) return;
			click = false;
			new Anim(slide.current, {
				prop: 'margin-left',
				value: '-66%',
				duration: 400,
				callback: () => {
					click = true;
					slide.current.style.marginLeft = '-33%';
					slide.current.append(slide.current.firstElementChild);
				},
			});
		}
	};

	const prev = () => {
		if (matchMedia('screen and (max-width: 549px)').matches) {
			if (!click) return;
			click = false;
			new Anim(imgs[idx], {
				prop: 'margin-left',
				value: '-100%',
				duration: 400,
				callback: () => {
					imgs[idx].classList.remove('on');
					imgs[idx].style.marginLeft = 0;
				},
			});
			if (idx == 6) {
				imgs[0].classList.add('on');
				imgs[0].style.left = '200%';
				new Anim(imgs[0], {
					prop: 'left',
					value: 0,
					duration: 400,
					callback: () => {
						click = true;
						setIdx(0);
					},
				});
			} else {
				imgs[idx + 1].classList.add('on');
				imgs[idx + 1].style.left = '200%';
				new Anim(imgs[idx + 1], {
					prop: 'left',
					value: 0,
					duration: 400,
					callback: () => {
						click = true;
						setIdx(idx + 1);
					},
				});
			}
		} else {
			//  width 549px를 넘으면
			if (slide.current.style.marginLeft === 'auto') {
				slide.current.prepend(slide.current.lastElementChild);
				slide.current.style.marginLeft = '-33%';
			}

			if (!click) return;
			click = false;
			new Anim(slide.current, {
				prop: 'margin-left',
				value: '0%',
				duration: 500,
				callback: () => {
					click = true;
					slide.current.prepend(slide.current.lastElementChild);
					slide.current.style.marginLeft = '-33%';
				},
			});
		}
	};

	const images = [
		`${path}/img/tv1.jpg`,
		`${path}/img/tv2.jpg`,
		`${path}/img/tv3.jpg`,
		`${path}/img/tv4.jpg`,
		`${path}/img/tv5.jpg`,
		`${path}/img/tv6.jpg`,
		`${path}/img/tv7.png`,
	];

	return (
		<div className='frame'>
			<span>PHOTOS </span>
			<article className='pics'>
				<div className='slide' ref={slide}>
					{images.map((i, idx) => {
						return <img src={i} alt={`kitchen` + (idx + 1)} key={idx} />;
					})}
				</div>
				{mobile ? (
					<div className='index'>
						{images.map((i, idx) => {
							return (
								<button
									key={idx}
									onClick={() => {
										setIdx(idx);
										index(idx);
									}}
									onFocus={() => {
										setIdx(idx);
										index(idx);
									}}
									tabIndex={0}
									aria-label={idx + `번 이미지`}
								/>
							);
						})}
					</div>
				) : null}
			</article>
			<button
				aria-label='이전 버튼. 엔터를 누를때마다 이전 이미지가 보입니다.'
				className='prev'
				onClick={prev}
				tabIndex={mobile.current ? -1 : 0}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</button>
			<button
				aria-label='다음 버튼. 엔터를 누를때마다 다음 이미지가 보입니다.'
				className='next'
				onClick={next}
				tabIndex={mobile.current ? -1 : 0}>
				<FontAwesomeIcon icon={faAngleRight} />
			</button>
		</div>
	);
}

export default YC_photos;
