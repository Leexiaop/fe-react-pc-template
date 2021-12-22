import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Divider,
	Typography,
	Tabs,
	Table
} from 'antd';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const UserVoiceAnalysis = () => {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log('Finish:', values);
	};
	return (
		<>
			<Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
				<Form.Item name="username">
					<Select defaultValue="day">
						<Option value="day">日</Option>
						<Option value="month">月</Option>
						<Option value="year">年</Option>
					</Select>
				</Form.Item>
				<Form.Item name="username">
					<RangePicker />
				</Form.Item>
				<Form.Item name="id">
					<Input placeholder="输入体验官ID进行搜索" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">刷新</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Typography>
				<Title level={2}>
					<blockquote>接待量统计</blockquote>
				</Title>
				<Paragraph>
					<Tabs defaultActiveKey="1">
						<TabPane tab="时间维度" key="1" />
						<TabPane tab="人员纬度" key="2" />
					</Tabs>
					<pre>blockContent</pre>
				</Paragraph>
				<Title level={2}>
					<blockquote>指标提及分析</blockquote>
				</Title>
				<Paragraph>
					<Tabs defaultActiveKey="1">
						<TabPane tab="正面提及率" key="1" />
						<TabPane tab="负面提及率" key="2" />
						<TabPane tab="综合满意度" key="3" />
					</Tabs>
					<pre>blockContent</pre>
				</Paragraph>
				<Title level={2}>
					<blockquote>用户评论</blockquote>
				</Title>
				<Paragraph>
					<pre>blockContent</pre>
				</Paragraph>
			</Typography>
		</>
	);
};

export default UserVoiceAnalysis;
