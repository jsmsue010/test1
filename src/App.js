import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './scss/style.scss';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/common/Layout';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'YOUTUBE_START' });
		dispatch({ type: 'FLICKR_START' });
		if (!localStorage.getItem('posts')) {
			localStorage.setItem(
				'posts',
				JSON.stringify([
					{
						title: 'Nulla a quam ac mauris sollicitudin aliquam in sed turpi?',
						text: 'it is dummy text7',
					},
					{
						title: 'Integer porta sapien eu magna pharetra rhoncus.?',
						text: 'it is dummy text6',
					},
					{
						title:
							'Mauris aliquam lobortis lacus, vitae tempus risus commodo vel?',
						text: 'it is dummy text5',
					},
					{
						title:
							'Aenean iaculis erat sit amet leo feugiat, ut cursus quam ornare?',
						text: 'it is dummy text4',
					},
					{
						title: 'laoreet odio tortor, et porta dui elementum at?',
						text: 'it is dummy text3',
					},
					{
						title:
							'Ut volutpat sapien eu nisi faucibus, mollis congue est molestie?',
						text: 'it is dummy text2',
					},
					{
						title: 'Nam hendrerit justo quis massa luctus suscipi?',
						text: 'it is dummy text1',
					},
				])
			);
		} //else {console.log('had');}
	}, []);

	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Layout}></Route>
				<Route exact path='/brand' component={Layout}></Route>
			</Switch>
		</div>
	);
}

export default App;
