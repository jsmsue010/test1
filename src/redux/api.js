import axios from 'axios';

const key = 'e4ad42c398a13766fbb6a782241ed17d';
const user = '195874938@N08';

const method = 'flickr.people.getPhotos';
const page = 20;
const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${key}&per_page=${page}&format=json&nojsoncallback=1&user_id=${user}`;

const youtube_key = 'AIzaSyCnDPgsYmeoiN1OCGp-2bZ0xzpOVCnSokM';
const playListId = 'PLgRXT2p63sR2XX3SUYVo57tpYJxmNIhm-';
const num = 6;
const youtube_url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${youtube_key}&playlistId=${playListId}&maxResults=${num}`;

export const getYoutube = async () => {
	const res = axios.get(youtube_url);
	const data = await res;
	console.log(data.data.items);
	return data;
};

export const getFlickr = async () => {
	const res = axios.get(url);
	const data = await res;
	console.log(data);
	console.log(data.data.photos.photo);
	return data;
	//(json.data.photos.photo);
};
