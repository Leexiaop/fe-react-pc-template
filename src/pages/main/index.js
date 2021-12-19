import {
	Link,
	Switch,
	Route
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import mainRouter from '../../router/main';
import './index.scss';
import logo from '../../assets/images/logo.svg';

const { Header, Sider, Content } = Layout;

const Main = () => {
	return (
		<Layout>
			<Header className="header">
				<img className="logo" src={require('../../assets/images/logo.svg').default} alt="" />
			</Header>
			<Layout>
				<Sider>
					<Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
						{
							mainRouter.map((route) => {
								return (
									<Menu.Item key={route.id}>
										<Link to={route.path}>{route.name}</Link>
									</Menu.Item>
								);
							})
						}
					</Menu>
				</Sider>
				<Content>
					<Switch>
						{
							mainRouter.map((child) => {
								return (
									<Route exact path={child.path} key={child.id} component={child.component} />
								);
							})
						}
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Main;
