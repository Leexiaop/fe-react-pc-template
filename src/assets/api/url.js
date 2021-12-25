// const url = 'http://localweb.baidu.com:8532';
let url = window.location.href;
switch (process.env.NODE_ENV) {
	case 'development':
		// url = 'http://localweb.baidu.com/api';
		url = 'http://180.76.186.226/api/';
		break;
	default:
		url = `${window.location.origin}/api/`;
}
export default {
	// 登录及用户信息相关
	login: `${url}/user/login`,
	getUserinfo: `${url}/user/getUser`,
	getUserList: `${url}/record-user/userList`,
	/**
	 * 总体分析
	 */
	// 用户之声分析
	getReceptionDataList: `${url}/receptionVolume/list`,
	getReceptionChart: `${url}/receptionVolume/charts`,
	getIndicatChart: `${url}/indicatorsMentioned/charts`,
	getIndicatDetail: `${url}/indicatorsMentioned/detail`,
	getCommentDataList: `${url}/comment/analysis`,
	/**
	 * 接待数据统计
	 */
	getRecordDataList: `${url}/record/page`,
	getRecordDetail: `${url}/record/detail`,
	exportRecordList: `${url}/record/export`
};
