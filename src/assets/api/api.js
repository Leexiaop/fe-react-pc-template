import { message } from 'antd';
import { api } from './request';

/**
 * $api 具体实现方法
 * */
class API {
	static get(url, params, options = {}) {
		return api({
			url,
			method: 'get',
			params,
			...options
		});
	}

	static post(url, data, options = {}) {
		return api({
			url,
			method: 'post',
			data,
			...options
		});
	}

	static put(url, data, options = {}) {
		return api({
			url,
			method: 'put',
			data,
			...options
		});
	}

	static delete(url, data, options = {}) {
		return api({
			url,
			method: 'delete',
			data,
			...options
		});
	}

	// formFields [{name,value}]
	static upload(url, file, formFields = [], options) {
		const data = new FormData();

		// formFields = [{name: 'file', value: FileO}] // 兼容
		if (file) {
			data.append('file', file);
		}

		for (const it of formFields) {
			data.append(it.name, it.value);
		}

		return api({
			url,
			method: 'post',
			data,
			...options
		});
	}

	static async download(url, params, options = { responseType: 'blob' }) {
		let errorData = null;
		const res = await api({
			url,
			method: 'post',
			data: params,
			...options
		}).catch((error) => {
			errorData = error;
		});
		if (errorData) {
			return { code: 1, errorData };
		}

		if (!res.data) {
			return { code: 1, data: null };
		}
		let filename = options?.filename;
		if (!filename) {
			const matcher = decodeURIComponent(res.headers['content-disposition'] || '')
				.match(/filename=([^;]+)/) || [];
			if (matcher[1]) {
				[filename] = matcher;
			}
		}
		const extendType = res.data.type === 'application/json' ? 'json' : 'xls';
		if (extendType === 'json') {
			const reader = new FileReader();
			reader.onload = () => {
				let msg = '报错';
				try {
					msg = JSON.parse(reader.result).msg;
				} catch (e) {
					console.log(e);
				}
				message.error(msg);
			};
			reader.readAsText(res.data);
			return false;
		}
		const downloadUrl = window.URL.createObjectURL(new Blob([res.data], { type: res.data.type }));
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.setAttribute('download', filename || `导出文件.${extendType}`);
		document.body.appendChild(link);
		link.click();
		return { code: 0, data: res.data, _raw: res };
	}
}

export default API;
