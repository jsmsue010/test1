import React from 'react';
import { path } from '../main/Main_content';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function BC_team() {
	const sliderImg = [
		`${path}/img/people1.jpg`,
		`${path}/img/people2.png`,
		`${path}/img/people4.jpg`,
		`${path}/img/people3.jpg`,
	];
	const sliderTitle = [
		'Operations',
		'Design',
		'Administration',
		'Human Resources',
	];
	const sliderAlt = [
		'Operations team',
		'Design team',
		'Administration team',
		'Human Resources team',
	];

	const img = [
		`${path}/img/teamwork.jpg`,
		`${path}/img/goal.jpg`,
		`${path}/img/team.jpg`,
	];
	const alt = ['teamwork', 'goal', 'prepared team'];
	const title = [
		'We believe in teamwork.',
		'We work for a common goal.',
		'We are a prepared and united team.',
	];

	return (
		<>
			<div className='wrap'>
				<div className='intro'>
					<h2>OUR TEAM</h2>
					<p>
						quis inventore enim iure eligendi beatae, perspiciatis omnis facere,
						sint distinctio? Consequuntur dolorem aperiam doloribus fugit quae.
					</p>
				</div>

				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className='mySwiper'>
					{sliderImg.map((s, idx) => {
						return (
							<SwiperSlide key={idx} tabIndex={0}>
								<h3>{sliderTitle[idx]}</h3>
								<img src={s} alt={sliderAlt[idx]} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>

			<div className='teamWork'>
				{img.map((i, idx) => {
					return (
						<div key={idx} className='box' tabIndex={0}>
							<img src={i} alt={alt[idx]} />
							<p>{title[idx]}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default BC_team;
