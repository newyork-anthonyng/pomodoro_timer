import React from 'react';
import { connect } from 'react-redux';
import { Time } from '../components/Time';
import Utility from '../utility';

const mapStateToProps = (state) => {
	return {
		time: Utility.formatTime(state.seconds)
	};
};

const mapDispatchToProps = (dispath) => ({});

export const TimeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Time);
