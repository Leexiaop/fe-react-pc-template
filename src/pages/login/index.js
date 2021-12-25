import { useHistory } from 'react-router-dom';
import {
	Form,
	Input,
	Button,
	message
} from 'antd';
import './index.scss';
import url from '../../assets/api/url';
import api from '../../assets/api/api';

const Login = () => {
	const history = useHistory();
	const onFinish = async (values) => {
		const { data, code, msg } = await api.post(url.login, {
			password: values.password,
			userName: values.username
		});
		if (code === 0) {
			message.success('登录成功!');
			window.localStorage.setItem('token', data.token);
			history.push('/main/user-voice-analysis');
			return;
		}
		message.warning(msg);
	};
	return (
		<div className="login">
			<div className="content">
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码!' }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
