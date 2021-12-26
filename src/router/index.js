import { lazy } from 'react';

const routers = [
	{
		id: 1,
		path: '/',
		exact: true,
		component: lazy(() => import('../pages/login'))
	},
	{
		id: 2,
		exact: false,
		path: '/main',
		component: lazy(() => import('../pages/main'))
	}
];

export default routers;
