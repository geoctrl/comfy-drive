import axios from 'axios';

let prodUrl = '/rest';
let mockUrl = 'http://localhost:7001/rest';

export let prod = axios.create({
	baseURL: __DEV__ ? mockUrl : prodUrl
});

export let mock = axios.create({
	baseURL: mockUrl
});