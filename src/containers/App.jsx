import React from 'react';
import { connect } from 'react-redux';
import { TimeContainer } from './TimeContainer';
import { TimerLabels } from '../components/TimerLabels';
import { SettingsContainer } from './SettingsContainer';
import { Footer } from '../components/Footer';
import { startTimer, setTime, stopTimer, toggleSettingsPanel } from '../actions';

const TimerWorker = require('worker!./webworker.js');

let App = React.createClass({
	componentWillMount: function() {
		this.setWorker();
	},

	setWorker: function() {
		this.timerWorker = new TimerWorker();

		this.timerWorker.addEventListener('message', (e) => {
			switch(e.data.action) {
				case 'TICK':
					this.props.setTime(e.data.time);
					break;
			}
		});
	},

	handlePlayClick: function() {
		if(!this.props.isRunning) {
			this.playTimer();
		} else {
			this.pauseTimer();
		}
	},

	playTimer: function() {
		this.timerWorker.postMessage({
			action: 'START',
			time: this.props.seconds
		});

		this.props.startTimer();
	},

	pauseTimer: function() {
		this.timerWorker.postMessage({
			action: 'STOP'
		});

		this.props.stopTimer();
	},

	resetTimer: function() {
		console.log('reset timer');

		this.pauseTimer();
		this.props.setTime(this.props.default.work);
	},

	toggleSettings: function() {
		console.log('toggle settings');
		this.props.toggleSettingsPanel();
	},

	render: function() {
		return (
			<div>
				<TimeContainer />
				<TimerLabels
					handlePlayClick={this.handlePlayClick}
					handleResetClick={this.resetTimer}
					handleSettingsClick={this.toggleSettings}
					isRunning={this.props.isRunning}
				/>
				<SettingsContainer />
				<Footer />
			</div>
		);
	}
});

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		startTimer: () => {
			dispatch(startTimer());
		},
		setTime: (seconds) => {
			dispatch(setTime(seconds));
		},
		stopTimer: () => {
			dispatch(stopTimer());
		},
		toggleSettingsPanel: () => {
			dispatch(toggleSettingsPanel());
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
