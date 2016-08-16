import axios from 'axios';

let prodUrl = '/rest';
let mockUrl = 'http://localhost:7001/rest';

export prod = axios.create({
	baseURL: __DEV__ ? mockUrl : prodUrl
});