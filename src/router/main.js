import { lazy } from 'react';

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
				component: lazy(() => import('../pages/user-voice-analysis'))
			}
		]
	},
	{
		id: 2,
		path: '/main/reception-data-manage',
		name: '接待数据管理',
		icon: 'DatabaseOutlined',
		component: lazy(() => import('../pages/reception-data-manage'))
	}
];

export default mainRouter;
