import {
	Form,
	Input,
	Button,
	DatePicker,
	Divider,
	Table,
	Space
} from 'antd';
import moment from 'moment';
import { useState, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import url from '../../assets/api/url';
import api from '../../assets/api/api';
import './index.scss';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { Column } = Table;

const ReceptionDataManage = () => {
	const [dataList, setDataList] = useState([]);
	const [total, setTotal] = useState(0);
	const [size, setSize] = useState(1);
	const [current, setCurrent] = useState(10);
	const [queryData, setQueryData] = useState({
		recordUserCode: '',
		rangeDate: [moment(moment(), dateFormat), moment(moment(), dateFormat)]
	});
	const [form] = Form.useForm();

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
				recordUrl: res.recordUrl
			};
		}));
	};
	const onRecordClick = useCallback((text) => {
		console.log(text);
	});
	const onPageChange = (cur) => {
		setSize(cur);
	};
	const onPageSizeChange = (cur, pageSize) => {
		setCurrent(pageSize);
		setSize(cur);
	};
	useDeepCompareEffect(() => {
		console.log(1111);
		getRecordDataList();
	}, [current, size, queryData]);
	const onFinish = (values) => {
		setQueryData({ ...queryData, ...values });
	};
	const onReset = () => {
		setQueryData({
			...queryData,
			...{
				recordUserCode: '',
				rangeDate: [moment(moment(), dateFormat), moment(moment(), dateFormat)]
			}
		});
		form.resetFields();
	};
	return (
		<>
			<Form form={form} name="horizontal_login" initialValues={queryData} layout="inline" onFinish={onFinish}>
				<Form.Item name="rangeDate">
					<RangePicker format={dateFormat} allowClear={false} />
				</Form.Item>
				<Form.Item name="recordUserCode">
					<Input placeholder="输入体验官ID进行搜索" />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">搜索</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button" onClick={onReset}>刷新</Button>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="button">数据导出</Button>
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
				<Column title="序号" dataIndex="key" key="key" />
				<Column title="接待日期" dataIndex="recordTime" key="recordTime" />
				<Column title="体验官ID" dataIndex="recordUserCode" key="recordUserCode" />
				<Column title="接待时长" dataIndex="durationTime" key="durationTime" />
				<Column title="录音开始时间" dataIndex="recordStartTime" key="recordStartTime" />
				<Column title="录音结束时间" dataIndex="recordEndTime" key="recordEndTime" />
				<Column
					title="录音解析"
					key="action"
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
		</>
	);
};

export default ReceptionDataManage;
