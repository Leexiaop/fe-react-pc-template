import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Divider,
	Typography,
	Tabs,
	Collapse,
	Table,
	Empty,
	Space
} from 'antd';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import moment from 'moment';
import * as echarts from 'echarts';
import url from '../../assets/api/url';
import api from '../../assets/api/api';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{
		title: '指标名称',
		align: 'center',
		dataIndex: 'fieldIndex',
		key: 'fieldIndex'
	},
	{
		title: '提及量',
		align: 'center',
		dataIndex: 'positiveCount',
		key: 'positiveCount',
		indicatType: 1
	},
	{
		title: '指标率',
		align: 'center',
		dataIndex: 'positiveRate',
		key: 'positiveRate',
		indicatType: 1
	},
	{
		title: '提及量',
		align: 'center',
		dataIndex: 'negativeCount',
		key: 'negativeCount',
		indicatType: 2
	},
	{
		title: '指标率',
		align: 'center',
		dataIndex: 'negativeRate',
		key: 'negativeRate',
		indicatType: 2
	},
	{
		title: '正提及量',
		align: 'center',
		dataIndex: 'positiveCount',
		key: 'positiveCount',
		indicatType: 3
	},
	{
		title: '负提及量',
		align: 'center',
		dataIndex: 'negativeCount',
		key: 'negativeCount',
		indicatType: 3
	},
	{
		title: '满意度',
		align: 'center',
		dataIndex: 'satisfiedRate',
		key: 'satisfiedRate',
		indicatType: 3
	}
];

const UserVoiceAnalysis = () => {
	const [queryData, setQueryData] = useState({
		rangeType: 'day',
		rangeDate: [moment(moment(), dateFormat), moment(moment(), dateFormat)],
		userInfo: ''
	});
	const [isReception, setIsReception] = useState(false);
	const [isIndicat, setIndicat] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [total, setTotal] = useState(0);
	const [indicatType, setIndicatType] = useState(1);
	const [receptionType, setReceptionType] = useState(1);
	const [commentList, setCommentList] = useState([]);
	const [form] = Form.useForm();

	const getCommentDataList = async () => {
		const { data } = await api.get(url.getCommentDataList, {
			beginDate: moment(queryData.rangeDate[0], dateFormat),
			endDate: moment(queryData.rangeDate[1], dateFormat),
			type: queryData.rangeType,
			businessType: indicatType,
			userInfo: queryData.userInfo
		});
		setCommentList(data.map((item, index) => {
			return {
				key: index,
				commentText: item.commentText,
				count: item.count,
				sentiment: item.sentiment
			};
		}));
	};
	const getIndicatDetail = async () => {
		const { data } = await api.post(url.getIndicatDetail, {
			beginDate: moment(queryData.rangeDate[0], dateFormat),
			endDate: moment(queryData.rangeDate[1], dateFormat),
			type: queryData.rangeType,
			businessType: indicatType,
			userInfo: queryData.userInfo
		});
		setTotal(data.totalCount);
		setDataList(data.results.map((result, index) => {
			return {
				fieldIndex: result.fieldIndex,
				negativeCount: result.negativeCount,
				negativeRate: `${result.negativeRate * 100}%`,
				positiveCount: result.positiveCount,
				positiveRate: `${result.positiveRate * 100}%`,
				satisfiedCount: result.satisfiedCount,
				satisfiedRate: `${result.satisfiedRate}%`,
				totalCount: result.totalCount,
				key: index
			};
		}) || []);
	};
	const getIndicatChart = async () => {
		const { data } = await api.post(url.getIndicatChart, {
			beginDate: moment(queryData.rangeDate[0], dateFormat),
			endDate: moment(queryData.rangeDate[1], dateFormat),
			type: queryData.rangeType,
			businessType: indicatType,
			userInfo: queryData.userInfo
		});
		setIndicat(!data.data.length);
		getIndicatDetail();
		if (!data.data.length) return;
		const myChart = echarts.init(document.getElementById('indicat'));
		const option = {
			dataset: {
				source: [
					['score', '数量', 'product'],
					...data.data
				]
			},
			grid: { containLabel: true },
			xAxis: { name: '数量' },
			yAxis: { type: 'category' },
			visualMap: {
				show: false,
				orient: 'horizontal',
				left: 'center',
				min: 10,
				max: 100,
				text: ['最高', '最低'],
				dimension: 0,
				inRange: {
					color: ['#65B581', '#FFCE34', '#FD665F']
				}
			},
			series: [
				{
					type: 'bar',
					barMaxWidth: '36px',
					encode: {
						x: '数量',
						y: 'product'
					}
				}
			]
		};
		myChart.setOption(option, true);
	};
	const getReceptionChart = async () => {
		const { data } = await api.post(url.getReceptionChart, {
			beginDate: moment(queryData.rangeDate[0], dateFormat),
			endDate: moment(queryData.rangeDate[1], dateFormat),
			type: queryData.rangeType,
			businessType: receptionType,
			userInfo: queryData.userInfo
		});
		setIsReception(!data.x.length && !data.y.length);
		if (!data.x.length && !data.y.length) return;
		const myChart = echarts.init(document.getElementById('reception'));
		const option = {
			xAxis: {
				type: 'category',
				data: data?.x
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					data: data.y,
					type: 'bar',
					barMaxWidth: '36px'
				}
			]
		};
		myChart.setOption(option, true);
	};
	useDeepCompareEffect(() => {
		getReceptionChart();
	}, [receptionType, queryData]);
	useDeepCompareEffect(() => {
		getIndicatChart();
	}, [indicatType, queryData]);
	useDeepCompareEffect(() => {
		getCommentDataList();
	}, [queryData]);
	const onFinish = (values) => {
		setQueryData({ ...queryData, ...values });
	};
	const onReset = () => {
		setQueryData({
			...queryData,
			...{
				rangeType: 'day',
				rangeDate: [moment(moment(), dateFormat), moment(moment(), dateFormat)],
				userInfo: ''
			}
		});
		form.resetFields();
	};
	const onIndicatTabChange = (value) => {
		setIndicatType(Number(value));
	};
	const onReceptionTabChnage = (value) => {
		setReceptionType(Number(value));
	};
	const genExtra = () => (
		<Button
			type="primary"
			size="small"
			onClick={(event) => {
				event.stopPropagation();
			}}
		>
			导出
		</Button>
	);

	return (
		<>
			<Form form={form} name="horizontal_login" initialValues={queryData} layout="inline" onFinish={onFinish}>
				<Form.Item name="rangeType">
					<Select>
						<Option value="day">日</Option>
						<Option value="month">月</Option>
						<Option value="year">年</Option>
					</Select>
				</Form.Item>
				<Form.Item name="rangeDate">
					<RangePicker format={dateFormat} allowClear={false} />
				</Form.Item>
				<Form.Item name="userInfo">
					<Input placeholder="输入体验官ID进行搜索" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onReset}>刷新</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Typography>
				<Title level={2}>
					<blockquote>接待量统计</blockquote>
				</Title>
				<Paragraph>
					<Tabs defaultActiveKey={receptionType} onChange={onReceptionTabChnage}>
						<TabPane tab="时间维度" key={1} />
						<TabPane tab="人员纬度" key={2} />
					</Tabs>
					<pre>
						{
							isReception ? <Empty description={<>暂无数据</>} /> : <div id="reception" style={{ width: '100%', height: '500px' }} />
						}
					</pre>
				</Paragraph>
				<Title level={2}>
					<blockquote>指标提及分析</blockquote>
				</Title>
				<Paragraph>
					<Tabs defaultActiveKey={indicatType} onChange={onIndicatTabChange}>
						<TabPane tab="正面提及率" key={1} />
						<TabPane tab="负面提及率" key={2} />
						<TabPane tab="综合满意度" key={3} />
					</Tabs>
					<pre>
						{
							isIndicat ? <Empty description={<>暂无数据</>} /> : <div id="indicat" style={{ width: '100%', height: '500px' }} />
						}
					</pre>
					<Collapse>
						<Panel header="查看详情" key="1" extra={genExtra()}>
							<p>
								样本总量：
								{total}
							</p>
							<Table
								pagination={false}
								bordered
								columns={columns.filter((column) => !column.indicatType || column.indicatType === indicatType)}
								dataSource={dataList}
								title={() => <div style={{ textAlign: 'center' }}>{ indicatType === 1 ? '正面提及指标' : (indicatType === 2 ? '负面提及指标' : '综合满意度')}</div>}
							/>
						</Panel>
					</Collapse>
				</Paragraph>
				<Title level={2}>
					<blockquote>用户评论</blockquote>
				</Title>
				<Paragraph>
					<pre>
						<Space size={[8, 16]} wrap>
							{
								commentList.map((comment) => {
									return (
										<Button type={comment.sentiment === 2 ? 'primary' : (comment.sentiment === 0 ? 'danger' : '')} key={comment.key}>
											{
												comment.commentText
											}
											(
											{
												comment.count
											}
											)
										</Button>
									);
								})
							}
						</Space>
					</pre>
				</Paragraph>
			</Typography>
		</>
	);
};

export default UserVoiceAnalysis;
