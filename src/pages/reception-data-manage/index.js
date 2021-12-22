import {
	Form,
	Input,
	Button,
	DatePicker,
	Divider,
	Table
} from 'antd';
import moment from 'moment';
import { useState } from 'react';
import './index.scss';

const { RangePicker } = DatePicker;
const dataSource = [
	{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号'
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号'
	}
];
const columns = [
	{
		title: '序号',
		dataIndex: 'index',
		key: 'index',
		align: 'center'
	},
	{
		title: '接待日期',
		dataIndex: 'age',
		key: 'age',
		align: 'center'
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address',
		align: 'center'
	}
];

const ReceptionDataManage = (props) => {
	const [form] = Form.useForm();
	console.log(form);
	const initialValue = {
		id: 2222,
		time: [moment('2019/10/15', 'YYYY/MM/DD'), moment('2020/07/16', 'YYYY/MM/DD')]
	};
	const onRangePickerChange = (value) => {
		console.log(value);
	};
	const onFinish = (values) => {
		console.log('Finish:', values);
	};

	return (
		<>
			<Form form={form} name="horizontal_login" initialValues={initialValue} layout="inline" onFinish={onFinish}>
				<Form.Item name="time">
					<RangePicker onChange={onRangePickerChange} />
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
				<Form.Item>
					<Button type="primary" htmlType="submit">数据导出</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table bordered dataSource={dataSource} columns={columns} />
		</>
	);
};

export default ReceptionDataManage;
