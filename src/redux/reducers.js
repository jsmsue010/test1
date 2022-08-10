import { combineReducers } from 'redux';
import { FLICKR, YOUTUBE } from './actions';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case YOUTUBE.start:
			return { ...state };

		case YOUTUBE.success:
			return { ...state, youtube: action.payload };

		case YOUTUBE.error:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case FLICKR.start:
			return { ...state };

		case FLICKR.success:
			return { ...state, flickr: action.payload };

		case FLICKR.error:
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const allReducer = combineReducers({ youtubeReducer, flickrReducer });

export default allReducer;
