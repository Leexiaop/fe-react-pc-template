import { Spin } from 'antd';
import PropTypes from 'prop-types';
import './index.scss';

const Loading = (props) => {
	const { tip } = props;

	return (
		<div className="loading">
			<Spin tip={tip} size="large" />
		</div>
	);
};

Loading.defaultProps = {
	tip: '加载中...'
};

Loading.propTypes = {
	tip: PropTypes.string
};

export default Loading;
