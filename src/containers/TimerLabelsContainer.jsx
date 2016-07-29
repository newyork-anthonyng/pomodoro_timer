import React from 'react';
import { connect } from 'react-redux';
import { TimerLabels } from '../components/TimerLabels';
import { startTimer, stopTimer, toggleSettingsPanel } from '../actions';

const mapStateToProps = (state) => {
	return {
		isRunning: state.isRunning
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handlePlayClick: () => {
			dispatch(startTimer());
		},
		handleResetClick: () => {
			dispatch(stopTimer());
		},
		handleSettingsClick: () => {
			dispatch(toggleSettingsPanel());
		}
	};
};

export const TimerLabelsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(TimerLabels);
