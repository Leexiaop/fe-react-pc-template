// const url = 'http://localweb.baidu.com:8532';
let url = window.location.href;
switch (process.env.NODE_ENV) {
	case 'development':
		url = 'http://localweb.baidu.com:8532';
		break;
	default:
		url = `${window.location.href}/api`;
}
export default {
	login: `${url}user/login`,
	getUserinfo: `${url}/user/getUser`,
	getReceptionDataList: `${url}/receptionVolume/list`,
	getReceptionChart: `${url}/receptionVolume/charts`,
	getIndicatChart: `${url}/indicatorsMentioned/charts`,
	getIndicatDetail: `${url}/indicatorsMentioned/detail`
};
