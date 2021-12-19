import Drive from '../pages/drive';
import Car from '../pages/car';

const mainRouter = [
	{
		id: 1,
		path: '/main',
		name: '小汽车',
		component: Car
	},
	{
		id: 2,
		path: '/main/drive',
		name: '开车',
		component: Drive
	}
];

export default mainRouter;
