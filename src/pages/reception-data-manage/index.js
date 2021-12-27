import React, { useState } from 'react';
import {
	Form,
	Button,
	DatePicker,
	Divider,
	Table,
	Space,
	Modal,
	Typography,
	List,
	Avatar,
	Image,
	Tabs,
	Select,
	Card,
	Row,
	Col
} from 'antd';
import moment from 'moment';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import useDeepCompareEffect from 'use-deep-compare-effect';
import url from '../../assets/api/url';
import api from '../../assets/api/api';
import './index.scss';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { Column } = Table;
const { Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const ReceptionDataManage = () => {
	const [queryData, setQueryData] = useState({
		recordUserCode: undefined,
		rangeDate: [moment(moment(moment().startOf('month').format(dateFormat)), dateFormat), moment(moment(), dateFormat)]
	});
	const [form] = Form.useForm();
	const [userList, setUserList] = useState([]);
	const [dataList, setDataList] = useState([]);
	const [total, setTotal] = useState(0);
	const [size, setSize] = useState(1);
	const [current, setCurrent] = useState(10);
	const [isModalShow, setModalShow] = useState(false);
	const [recordDetail, setRecordDetail] = useState({});

	const getRecordDataList = async () => {
		const { data } = await api.post(url.getRecordDataList, {
			param: {
				startTime: moment(queryData.rangeDate[0]).format(dateFormat),
				endTime: moment(queryData.rangeDate[1]).format(dateFormat),
				recordUserCode: queryData.recordUserCode
			},
			pageNo: size,
			pageSize: current
		});
		setTotal(data.totalCount);
		setDataList(data.results.map((res, index) => {
			return {
				key: index + 1,
				recordTime: res.recordTime,
				recordUserCode: res.recordUserCode,
				durationTime: res.durationTime,
				recordStartTime: res.recordStartTime,
				recordEndTime: res.recordEndTime,
				recordUrl: res.recordUrl,
				recordCode: res.recordCode,
				recordUserName: res.recordUserName
			};
		}));
	};
	const onRecordClick = async (record) => {
		if (!record.recordUrl) return;
		const { data } = await api.get(url.getRecordDetail, { recordCode: record.recordCode });
		data.asrResult = JSON.parse(data.asrResult).map((asr, index) => {
			return {
				key: index,
				bg: asr.bg,
				ed: asr.ed,
				originalContent: asr.originalContent,
				realBg: asr.realBg,
				speaker: asr.speaker
			};
		});
		setModalShow(true);
		setRecordDetail(data);
		const myChart = echarts.init(document.getElementById('wordCloud'));
		myChart.setOption({
			backgroundColor: '#fff',
			series: [{
				type: 'wordCloud',
				gridSize: 8,
				shape: 'circle',
				drawOutOfBound: false,
				layoutAnimation: true,
				sizeRange: [12, 60],
				rotationRange: [-90, 90],
				rotationStep: 45,
				textStyle: {
					fontFamily: 'sans-serif',
					fontWeight: 'bold',
					color: () => {
						return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
					}
				},
				emphasis: {
					focus: 'self',
					textStyle: {
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				left: 'center',
				top: 'center',
				width: '70%',
				height: '80%',
				right: null,
				bottom: null,
				data: data.comments.map((c) => {
					return {
						name: `${c.commentText}(${c.count})`,
						value: c.count
					};
				})
			}]
		}, true);
	};
	const onPageChange = (cur) => {
		setSize(cur);
	};
	const onPageSizeChange = (cur, pageSize) => {
		setCurrent(pageSize);
		setSize(cur);
	};
	useDeepCompareEffect(() => {
		getRecordDataList();
	}, [current, size, queryData]);
	const onFinish = (values) => {
		setQueryData({ ...queryData, ...values });
	};
	const onReset = () => {
		setQueryData({
			...queryData,
			...{
				recordUserCode: undefined,
				rangeDate: [moment(moment(moment().startOf('month').format(dateFormat)), dateFormat), moment(moment(), dateFormat)]
			}
		});
		form.resetFields();
	};
	const onSearch = async () => {
		const { data } = await api.get(url.getUserList);
		setUserList(data);
	};
	const onDataExport = async () => {
		return api.download(url.exportRecordList, {
			param: {
				startTime: moment(queryData.rangeDate[0]).format(dateFormat),
				endTime: moment(queryData.rangeDate[1]).format(dateFormat),
				recordUserCode: queryData.recordUserCode
			},
			pageNo: size,
			pageSize: current
		});
	};
	return (
		<>
			<Form form={form} name="horizontal_login" initialValues={queryData} layout="inline" onFinish={onFinish}>
				<Form.Item name="rangeDate">
					<RangePicker format={dateFormat} allowClear={false} />
				</Form.Item>
				<Form.Item name="recordUserCode">
					<Select
						showSearch
						placeholder="输入体验官姓名进行搜索"
						style={{ width: 200 }}
						optionFilterProp="children"
						onFocus={onSearch}
						filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					>
						{
							userList.map((user) => {
								return <Option value={user.userCode} key={user.id}>{user.userName}</Option>;
							})
						}
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onReset}>刷新</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onDataExport}>数据导出</Button>
				</Form.Item>
			</Form>
			<Divider />
			<Table
				bordered
				dataSource={dataList}
				pagination={
					{
						showSizeChanger: true,
						showTotal: () => `共${20}条`,
						total,
						onChange: (cur) => onPageChange(cur),
						onShowSizeChange: (cur, pageSize) => onPageSizeChange(cur, pageSize)
					}
				}
			>
				<Column title="序号" dataIndex="key" key="key" align="center" />
				<Column title="接待日期" dataIndex="recordTime" key="recordTime" align="center" />
				<Column title="体验官ID" dataIndex="recordUserCode" key="recordUserCode" align="center" />
				<Column title="体验官姓名" dataIndex="recordUserName" key="recordUserName" align="center" />
				<Column title="接待时长" dataIndex="durationTime" key="durationTime" align="center" />
				<Column title="录音开始时间" dataIndex="recordStartTime" key="recordStartTime" align="center" />
				<Column title="录音结束时间" dataIndex="recordEndTime" key="recordEndTime" align="center" />
				<Column
					title="录音解析"
					key="action"
					align="center"
					render={(record) => (
						<Space size="middle">
							<Button
								onClick={() => onRecordClick(record)}
								type={record.recordUrl ? 'primary' : 'text'}
								danger={!record.recordUrl}
							>
								{record.recordUrl ? '查看' : '无语音'}
							</Button>
						</Space>
					)}
				/>
			</Table>
			<Modal title="查看接待录音解析效果" width="920px" maskClosable={false} visible={isModalShow} footer={null} onCancel={() => setModalShow(false)}>
				<Typography>
					<Paragraph>
						<pre style={{ height: 48, display: 'flex', alignItems: 'center' }}>
							<audio src={recordDetail.recordUrl} preload="meta" controls id="audio" style={{ height: 24, width: '100%' }}>
								您的浏览器不支持音频
								<track
									default
									kind="captions"
									srcLang="en"
									src={recordDetail.recordUrl}
								/>
							</audio>
						</pre>
					</Paragraph>
					<Paragraph>
						<pre>
							<Space align="start">
								<Row gutter={16}>
									<Col span={8}>
										<Card title="基础信息" bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}>
											<p>
												录音文件ID:
												{recordDetail.recordCode}
											</p>
											<p>
												录音时间:
												{recordDetail.recordStartTime}
											</p>
											<p>
												通话时长:
												{recordDetail.durationTime}
											</p>
											<div id="wordCloud" style={{ width: '100%', height: 360 }} />
										</Card>
									</Col>
									<Col span={8}>
										<Card title="ASR结果(录音识别结果)" bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}>
											<List
												split={false}
												dataSource={recordDetail.asrResult}
												renderItem={(item) => (
													<List.Item key={item.key} style={{ margin: 0, padding: 0 }}>
														{
															item.speaker === 'advisor' ? (
																<div style={{
																	width: '100%',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'flex-start'
																}}
																>
																	<Typography>
																		<Space align="start">
																			<Avatar src={<Image src={require('../../assets/images/adverse.jpeg').default} />} />
																			<pre style={{ textAlign: 'left' }}>{item.originalContent}</pre>
																		</Space>
																	</Typography>
																</div>
															) : (
																<div style={{
																	width: '100%',
																	display: 'flex',
																	alignItems: 'center',
																	justifyContent: 'flex-end'
																}}
																>
																	<Typography>
																		<Space align="start">
																			<pre style={{ textAlign: 'left' }}>{item.originalContent}</pre>
																			<Avatar src={<Image src={require('../../assets/images/me.jpeg').default} />} />
																		</Space>
																	</Typography>
																</div>
															)
														}
													</List.Item>
												)}
											/>
										</Card>
									</Col>
									<Col span={8}>
										<Card title="NLP结果(录音解析结果)" bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}>
											<Tabs defaultActiveKey="1">
												<TabPane tab="指标命中分析" key="1">
													<Table
														bordered
														scroll={{ y: 460 }}
														dataSource={recordDetail.labels && recordDetail.labels.map((label, index) => {
															return {
																key: index,
																labelName: label.labelName,
																competitions: label.competitions,
																sentiment: label.sentiment,
																sentimentName: label.sentiment === 1 ? '一般' : (label.sentiment === 0 ? '较差' : '优秀')
															};
														})}
														pagination={false}
													>
														<Column title="命中指标" dataIndex="labelName" key="labelName" align="center" />
														<Column title="关联竞品" dataIndex="competitions" key="competitions" align="center" />
														<Column title="优劣" dataIndex="sentimentName" key="sentimentName" align="center" />
													</Table>
												</TabPane>
											</Tabs>
										</Card>
									</Col>
								</Row>
							</Space>
						</pre>
					</Paragraph>
				</Typography>
			</Modal>
		</>
	);
};

export default ReceptionDataManage;
