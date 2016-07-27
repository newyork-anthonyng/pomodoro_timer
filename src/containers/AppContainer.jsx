const React = require('react');
const ReactDOM = require('react-dom');
const Time = require('../components/Time.jsx');
const ActionContainer = require('./ActionContainer.jsx');
const Footer = require('../components/Footer.jsx');
const Utility = require('../utility.js');
const TimerWorker = require('worker!./webworker.js');

const AppContainer = React.createClass({
	getInitialState: function() {
		return {
			isRunning: false,
			seconds: 0,
			mode: 'work',
			default: {
				work: 25 * 60,
				break: 5 * 60
			}
		};
	},

	componentWillMount: function() {
		this.setState({ seconds: this.state.default.work });
		this.setTimerWorker();
	},

	componentWillUnmount: function() {
		this.timerWorker.terminate();
		this.timerWorker = null;
	},

	setTimerWorker: function() {
		this.timerWorker = new TimerWorker();
		this.timerWorker.addEventListener('message', (e) => {
			switch(e.data.action) {
				case 'TICK':
					this.setState({ seconds: e.data.time });
					document.title = Utility.formatTime(this.state.seconds);
					break;
				case 'COMPLETE':
					this.setState({ isRunning: false });
					Utility.displayNotification('Take a break', 'You\'ve earned it!');
					break;
				default:
					return false;
			};
		});
	},

	handlePlayClick: function() {
		if(this.state.isRunning) {
			this.pauseTimer();
		} else {
			this.playTimer();
		}

		this.setState({ isRunning: !this.state.isRunning });
	},

	playTimer: function() {
		this.timerWorker.postMessage({
			action: 'START',
			time: this.state.seconds
		});
	},

	pauseTimer: function() {
		this.timerWorker.postMessage({
			action: 'STOP'
		});
	},

	handleResetClick: function() {
		this.resetTimer();
	},

	resetTimer: function() {
		this.pauseTimer();

		const newSeconds = this.state.default[this.state.mode];
		this.setState({ seconds: newSeconds });
	},

	handleSettingsUpdate: function(newDefault) {
		const formattedDefault = {};
		formattedDefault[newDefault.type] = Utility.convertMinutesToSeconds(newDefault.time);

		const newDefaults = Object.assign({}, this.state.default, formattedDefault);

		this.setState({ default: newDefaults });
	},

	render: function() {
		return (
			<div className="container">
				<Time seconds={Utility.formatTime(this.state.seconds)} />
				<ActionContainer
					handlePlayClick={this.handlePlayClick}
					handleResetClick={this.handleResetClick}
					isRunning={this.state.isRunning}
					handleSettingsUpdate={this.handleSettingsUpdate}
					work={Utility.convertSecondsToMinutes(this.state.default.work)}
					break={Utility.convertSecondsToMinutes(this.state.default.break)}
				/>
				<Footer>Pomodoro Timer</Footer>
			</div>
		);
	}
});

module.exports = AppContainer;
