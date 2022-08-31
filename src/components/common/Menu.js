import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const active = { color: '#aaa' };

function Menu() {
	const [buttonOn, setButtonOn] = useState(false);
	const firstKey = useRef(null);

	const menuPc = (
		<ul>
			<li>
				ABOUT
				<ul className='sec'>
					<li>
						<NavLink to='/brand' activeStyle={active}>
							BRAND
						</NavLink>
					</li>
					<li>
						<NavLink to='/product' activeStyle={active}>
							PRODUCT
						</NavLink>
					</li>
				</ul>
			</li>
			<li>
				<NavLink to='/gallery' activeStyle={active}>
					GALLERY
				</NavLink>
			</li>
			<li>
				<NavLink to='/youtube' activeStyle={active}>
					YOUTUBE
				</NavLink>
			</li>
			<li>
				<NavLink to='/board' activeStyle={active}>
					BOARD
				</NavLink>
			</li>
			<li>
				<NavLink to='/sign_up' activeStyle={active}>
					SIGN-UP
				</NavLink>
			</li>
		</ul>
	);

	const menuAni = () => {
		console.log(buttonOn);
		if (!buttonOn) {
			setButtonOn(true);
			setTimeout(() => {
				if (window.innerWidth > 599) {
					firstKey.current.style.width = `45vw`;
				} else {
					firstKey.current.style.width = `80vw`;
				}
			}, 100);
		} else {
			firstKey.current.style.width = `0vw`;
			setTimeout(() => setButtonOn(false), 500);
		}
	};

	const menuTabl = (
		<>
			<ul ref={firstKey} tabIndex='0'>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/' activeStyle={active}>
						CHROMKITCHEN
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/brand' activeStyle={active}>
						BRAND
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/product' activeStyle={active}>
						PRODUCT
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/gallery' activeStyle={active}>
						GALLERY
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/youtube' activeStyle={active}>
						YOUTUBE
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/board' activeStyle={active}>
						HELP
					</NavLink>
				</li>
				<li onClick={() => setButtonOn(false)}>
					<NavLink to='/sign_up' activeStyle={active}>
						SIGN-UP
					</NavLink>
				</li>
			</ul>
			<button
				className='close'
				onClick={() => {
					menuAni();
				}}
				onKeyDown={(e) => {
					if (e.key === 'Tab') firstKey.current.focus();
				}}>
				X
			</button>
		</>
	);

	return (
		<nav className='nav'>
			<h1>
				<NavLink exact to='/'>
					CHROME KITCHEN
				</NavLink>
			</h1>
			<div className='menu-pc'>{menuPc}</div>
			<div className='menu-tabl'>
				<button aria-label='메뉴 버튼'>
					{buttonOn ? null : (
						<FontAwesomeIcon
							icon={faBars}
							className='icon'
							tabIndex='0'
							onClick={() => {
								menuAni();
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') setButtonOn(!buttonOn);
							}}
						/>
					)}
				</button>
				{buttonOn ? menuTabl : null}
			</div>
		</nav>
	);
}

export default Menu;
