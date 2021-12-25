import { message } from 'antd';
import axios from 'axios';
import _ from 'lodash';

axios.interceptors.request.use((config) => {
	config.headers.token = window.localStorage.getItem('token');
	return config;
});

axios.interceptors.response.use((response) => {
	if (response.data.code === 201) {
		message.warning(response.data.msg, 5);
		window.localStorage.clear();
		window.location.href = '/';
		return false;
	}
	return response;
}, (error) => {
	message.warning('哎呀，出错了～～', 5);
	Promise.reject(error);
});

export const api = (config) => {
	return new Promise((resolve, reject) => {
		axios(config).then((res) => {
			if (res) {
				if (config.responseType === 'blob') {
					resolve(res);
				} else {
					resolve(res.data);
				}
			} else {
				reject(new Error());
			}
		}).catch((error) => {
			reject(error);
		});
	});
};
