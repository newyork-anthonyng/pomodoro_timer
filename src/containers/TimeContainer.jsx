import React from 'react';
import { connect } from 'react-redux';
import { Time } from '../components/Time';
import Utility from '../util/utility';

const mapStateToProps = (state) => {
	return {
		time: Utility.formatTime(state.seconds)
	};
};

export const TimeContainer = connect(
	mapStateToProps
)(Time);
