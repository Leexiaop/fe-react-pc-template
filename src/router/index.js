import Login from '../pages/login';
import Main from '../pages/main';

const routers = [
	{
		id: 1,
		path: '/',
		exact: true,
		component: Login
	},
	{
		id: 2,
		exact: false,
		path: '/main',
		component: Main
	}
];

export default routers;
