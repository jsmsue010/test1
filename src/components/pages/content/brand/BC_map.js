import React, { useEffect, useRef, useState } from 'react';

function BC_map() {
	const container = useRef(null);
	const { kakao } = window; //윈도우 전역객체에서 카카오객체를 직접찾아서 변수에 할당.
	const [traffic, setTraffic] = useState(false);
	const [map, setMap] = useState(); //안에 들어갈 자료형 적확하게 모르겠다면, null로! 자료형이 다르면 set되지 않는다.
	const [index, setIndex] = useState(0);

	const info = [
		{
			title: 'Head Office',
			latlng: new kakao.maps.LatLng(37.51426220045354, 127.06024581720781),
		},
		{
			title: 'Donut Factory',
			latlng: new kakao.maps.LatLng(37.51720985347799, 127.04134374625059),
		},
		{
			title: 'Flagship Store',
			latlng: new kakao.maps.LatLng(37.585601140947716, 127.02013033711161),
		},
	];

	useEffect(() => {
		const option = {
			center: new kakao.maps.LatLng(37.51426220045354, 127.06024581720781), // 지도의 중심좌표
			level: 3, // 지도의 확대 레벨
		};

		// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
		const initMap = new kakao.maps.Map(container.current, option);

		//위의 인스턴스 맵을 state로 옮긴다. 렌더링되어도 날아가지 않도록.
		setMap(initMap);

		info.forEach((i, idx) => {
			new kakao.maps.Marker({
				//각 옵션의 해당 위치에 마커 표시.
				position: i.latlng,
				map: initMap,
			});
		});
	}, []);

	function getCenter() {
		//console.log('resize');
		map.setCenter(info[index].latlng);
		//console.log('지도 중심으로 이동');
	}

	useEffect(() => {
		window.addEventListener('resize', getCenter);
		return () => {
			window.removeEventListener('resize', getCenter);
		};
	}, [map]);

	useEffect(() => {
		handleTraffic();
	}, [traffic]);

	const handleTraffic = () => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};
	return (
		<>
			<h2>MAP</h2>
			<div className='mapCompo'>
				<div id='map1' ref={container}></div>

				<div className='btnBox'>
					<button
						onClick={() => (traffic ? setTraffic(false) : setTraffic(true))}>
						{traffic ? 'TRAFFIC OFF' : 'TRAFFIC ON'}
					</button>
					{info.map((m, idx) => (
						<button
							key={idx}
							title={`${'store' + (idx + 1)}`}
							onClick={() => {
								map.setCenter(m.latlng);
								setIndex(idx);
							}}>
							{`${'store' + (idx + 1)}`}
						</button>
					))}
				</div>
				<div className='txt' tabIndex={0}>
					<h3>CONTACT US</h3>
					<div className='location'>
						<p>Lorem ipsum dolor sit consectetur adipisicin 05645</p>
						<p>TEL :+82-2-22-2220-2114</p>
					</div>
					<form action='#'>
						<fieldset>
							<legend className='h'>BOOK</legend>
							<table>
								<caption className='h'>BOOK INFO</caption>
								<tbody>
									<tr>
										<th scope='span'>
											<label htmlFor='name'>name</label>
										</th>
										<td>
											<input
												type='text'
												name='name'
												id='name'
												required
												placeholder='*name'
											/>
										</td>
									</tr>
									<tr>
										<th scope='span'>
											<label htmlFor='phone'>phone</label>
										</th>
										<td>
											<input
												type='text'
												name='phone'
												id='phone'
												required
												placeholder='*phone *only number'
											/>
										</td>
									</tr>
									<tr>
										<th scope='span'>
											<label htmlFor='time'>contact time</label>
										</th>
										<td>
											<select name='time' id='time'>
												<option value=''>select</option>
												<option value='open'>9:00~12:00</option>
												<option value='middle'>13:00~17:00</option>
												<option value='close'>18:00~22:00</option>
											</select>
										</td>
									</tr>
								</tbody>
							</table>
							<input type='submit' value='BOOK' />
						</fieldset>
					</form>
				</div>
			</div>
		</>
	);
}

export default BC_map;
