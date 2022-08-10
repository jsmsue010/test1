import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { getFlickr, getYoutube } from './api';
import { FLICKR, YOUTUBE } from './actions';

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube)]);
}

export function* callFlickr() {
	console.log('saga run');
	yield takeLatest(FLICKR.start, returnFlickr);
}
export function* returnFlickr() {
	try {
		const response = yield call(getFlickr);
		//console.log('flickr', response);
		yield put({
			type: FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: FLICKR.error, payload: err });
	}
}

export function* callYoutube() {
	yield takeLatest(YOUTUBE.start, returnYoutube);
}
export function* returnYoutube() {
	try {
		const response = yield call(getYoutube);
		yield put({ type: YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: YOUTUBE.error, payload: err });
	}
}
