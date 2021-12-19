import axios from 'axios';
import { message } from 'antd';
import _ from 'lodash';

axios.interceptors.request.use((config) => {
	config.headers.token = 'ddd';
	return config;
});

axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	Promise.reject(error);
});

export default async function api(config) {
	const time = Date.now();
	const res = await axios(config).catch((e) => {
		throw e;
	});

	if (config.responseType === 'blob') { return res; }

	let styleText = 'background: green;color: white;';
	let formatText = `%c 👍👍 ${config.method}::${config.url} $ `;
	if (res.data.code === 1) {
		styleText = 'background: red;color: white;';
		formatText = `%c 🐛🐛 ${config.method}::${config.url} $ `;
	}
	const tipInfo = {
		data: config.data || config.params || '@@',
		response: res.data,
		code: res.data.code,
		msg: res.data.msg,
		timing: Date.now() - time
	};

	// log
	console.log('\r\n');
	console.log(formatText, styleText, tipInfo?.response?.data);

	return res.data;
}
