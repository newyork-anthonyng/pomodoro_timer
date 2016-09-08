import React from 'react';
import { connect } from 'react-redux';
import Notification from '../components/Notification';

const mapStateToProps = (state) => {
	return {
		mode: state.mode,
		title: state.mode === 'break' ? 'Take a break!' : 'Back to work!',
		audioSource: state.mode === 'break' ? 'assets/break.mp3' : 'assets/beep.wav',
		sound: state.sound,
		image: 'http://www.pomodororossonyc.com/wp-content/uploads/2014/06/photodune-680322-tomato-xs.jpg'
	};
};

export const NotificationContainer = connect(
	mapStateToProps
)(Notification);
