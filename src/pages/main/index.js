import React, { useEffect, useState } from 'react';
import {
	Link,
	Switch,
	Route,
	useHistory
} from 'react-router-dom';
import {
	Layout,
	Menu,
	Dropdown,
	Card
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons';
import mainRouter from '../../router/main';
import url from '../../assets/api/url';
import api from '../../assets/api/api';
import './index.scss';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const Main = () => {
	const history = useHistory();
	const [username, setUsername] = useState('xiao');
	useEffect(async () => {
		const { data } = await api.get(url.getUserinfo);
		setUsername(data.userName);
	}, []);
	const onClick = () => {
		window.localStorage.removeItem('token');
		history.push('/');
	};
	const menu = (
		<Menu onClick={onClick}>
			<Menu.Item key="1">退出</Menu.Item>
		</Menu>
	);
	return (
		<Layout>
			<Header className="header">
				<img className="logo" src={require('../../assets/images/logo.png').default} alt="" />
				<Dropdown overlay={menu}>
					<a className="ant-dropdown-link" onClick={(e) => { e.preventDefault(); }}>
						{username}
						<DownOutlined />
					</a>
				</Dropdown>
			</Header>
			<Layout>
				<Sider>
					<Menu theme="light" mode="inline" className="menu" defaultSelectedKeys={['1']} defaultOpenKeys={[['sub1']]}>
						{
							mainRouter.map((route) => {
								const icon = React.createElement(Icon[route.icon]);
								return (
									<React.Fragment key={route.id}>
										{
											route.children && route.children.length ? (
												<SubMenu key={`sub${route.id}`} title={route.name} icon={icon}>
													{
														route.children.map((child) => {
															const childIcon = React.createElement(Icon[child.icon]);
															return (
																<Menu.Item key={child.id} icon={childIcon}>
																	<Link to={child.path}>{child.name}</Link>
																</Menu.Item>
															);
														})
													}
												</SubMenu>
											) : (
												<Menu.Item key={route.id} icon={icon}>
													<Link to={route.path}>{route.name}</Link>
												</Menu.Item>
											)
										}
									</React.Fragment>
								);
							})
						}
					</Menu>
				</Sider>
				<Content style={{ margin: 24 }}>
					<Card className="card">
						<Switch>
							{
								mainRouter.map((route) => {
									if (route.children) {
										return route.children.map((child) => {
											return <Route path={child.path} component={child.component} key={child.id} />;
										});
									}
									return <Route path={route.path} component={route.component} key={route.id} />;
								})
							}
						</Switch>
					</Card>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Main;
