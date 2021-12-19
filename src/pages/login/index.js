import { Form, Input, Button } from 'antd';
import './index.scss';

const Login = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
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
					onFinishFailed={onFinishFailed}
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
