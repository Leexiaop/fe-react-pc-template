import UserVoiceAnalysis from '../pages/user-voice-analysis';
import ReceptionDataManage from '../pages/reception-data-manage';

const mainRouter = [
	{
		id: 1,
		name: '总体分析',
		icon: 'BarChartOutlined',
		children: [
			{
				id: 1,
				name: '用户之声分析',
				path: '/main/user-voice-analysis',
				icon: 'UsergroupDeleteOutlined',
				component: UserVoiceAnalysis
			}
		]
	},
	{
		id: 2,
		path: '/main/reception-data-manage',
		name: '接待数据管理',
		icon: 'DatabaseOutlined',
		component: ReceptionDataManage
	}
];

export default mainRouter;
