import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { path } from '../pages/content/main/Main_content';
import Main_banner from '../pages/banner/Main_banner';
import Pages_banner from '../pages/banner/Pages_banner';
import Brand_content from '../pages/content/brand/Brand_content';
import Main_content from '../pages/content/main/Main_content';
import Footer from './Footer';
import Board_content from '../pages/content/board/Board_content';
import Product_content from '../pages/content/product/Product_content';
import SignUp_content from '../pages/content/SignUp_content';
import Gallery_content from '../pages/content/Gallery_content';
import Youtube_content from '../pages/content/youtube/Youtube_content';

function Layout({ children }) {
	const init = useRef(null);
	const test = useRef(null);

	useEffect(() => {
		//새로고침시 화면 제일 위로.
		init.current.focus();
	}, []);

	const router = useRouteMatch();
	console.log(router);
	let banner;
	let content;

	switch (router.path) {
		case '/':
			banner = <Main_banner />;
			content = <Main_content />;
			break;

		case '/brand':
			banner = (
				<Pages_banner src={`${path}/img/banner12.jpg`} pageName={`BRAND`} />
			);
			content = <Brand_content />;
			break;

		case '/product':
			banner = (
				<Pages_banner src={`${path}/img//banner14.jpg`} pageName={`PRODUCT`} />
			);
			content = <Product_content />;
			break;

		case '/gallery':
			banner = (
				<Pages_banner src={`${path}/img/banner00.jpg`} pageName={`GALLERY`} />
			);
			content = <Gallery_content />;
			break;

		case '/youtube':
			banner = (
				<Pages_banner src={`${path}/img/banner331.jpg`} pageName={`YOUTUBE`} />
			);
			content = <Youtube_content />;
			break;

		case '/board':
			banner = (
				<Pages_banner src={`${path}/img/banner332.jpg`} pageName={`BOARD`} />
			);
			content = <Board_content />;
			break;

		case '/sign_up':
			banner = (
				<Pages_banner src={`${path}/img/banner33.jpg`} pageName={`SIGN-UP`} />
			);
			content = <SignUp_content />;
			break;

		default:
			return <p>죄송합니다.</p>;
	}

	return (
		<div className='layout'>
			<div className='skipNavi' tabIndex='1' ref={init}>
				<button
					aria-label='본문바로가기'
					onClick={(e) => {
						test.current.focus();
					}}>
					본문으로
				</button>
			</div>
			<>{banner}</>
			<main>
				<div className='anchor' tabIndex='-1' ref={test} />
				{content}
			</main>
			<Footer tabIndex='0'>footer</Footer>
		</div>
	);
}

export default Layout;
