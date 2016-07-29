import React from 'react';
import { connect } from 'react-redux';
import Notification from '../components/Notification';

const mapStateToProps = (state) => {
	return {
		mode: state.mode,
		title: state.mode === 'break' ? 'Take a break!' : 'Back to work!',
		audioSource: 'assets/beep.wav',
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export const NotificationContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Notification);
