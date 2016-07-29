import React from 'react';
import { connect } from 'react-redux';
import Notification from '../components/Notification';

const mapStateToProps = (state) => {
	return {
		mode: state.mode,
		title: state.mode === 'break' ? 'Take a break!' : 'Back to work!',
		audioSource: state.mode === 'break' ? 'assets/break.mp3' : 'assets/beep.wav',
	};
};

export const NotificationContainer = connect(
	mapStateToProps
)(Notification);
