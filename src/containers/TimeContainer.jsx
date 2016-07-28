import React from 'react';
import { connect } from 'react-redux';
import { Time } from '../components/Time';

const mapStateToProps = (state) => {
	return {
		seconds: state.seconds
	};
};

const mapDispatchToProps = (dispath) => ({});

export const TimeContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Time);
