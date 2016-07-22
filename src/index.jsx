import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
	getInitialState: function() {
		return {
			isRunning: false,
			seconds: 1500
		};
	},

	componentWillMount: function() {
		this.intervals = [];
	},

	componentWillUnmount: function() {
		this.intervals.forEach(clearInterval);
	},

	handlePlayClicked: function() {
		if(this.state.isRunning) {
			this.pauseTimer();
		} else {
			this.playTimer();
		}

		this.setState({ isRunning: !this.state.isRunning });
	},

	playTimer: function() {
		console.log('%c playing timer', 'background-color: lightgreen;');
		const timer = window.setInterval(function() {
			this.setState({ seconds: this.state.seconds - 1 });
		}.bind(this), 1000);

		this.intervals.push(timer);
	},

	pauseTimer: function() {
		console.log('%c pausing timer', 'background-color: lightpink;');
		this.intervals.forEach(clearInterval);
	},

	handleResetClicked: function() {
		console.log('reset clicked');
	},

	handleSettingsClicked: function() {
		console.log('settings clicked');
	},

	render: function() {
		return (
			<div>
				<Time seconds={this.state.seconds} />
				<Label handleClick={this.handlePlayClicked}>{this.state.isRunning ? 'Pause' : 'Play'}</Label>
				<Label handleClick={this.handleResetClicked}>Reset</Label>
				<Label handleClick={this.handleSettingsClicked}>Settings</Label>
				<Footer>Pomodoro Timer</Footer>
			</div>
		);
	}
});

const Time = React.createClass({
	formatTime: function(seconds) {
		let minutes = parseInt(seconds / 60);
		minutes = minutes.length < 2 ? '0' + minutes : minutes;
		seconds = seconds % 60 + '';
		seconds = seconds.length < 2 ? '0' + seconds : seconds;

		return minutes + ':' + seconds;
	},

	render: function() {
		return (
			<div>
				<p>{this.formatTime(this.props.seconds)}</p>
			</div>
		);
	}
});

const Label = React.createClass({
	render: function() {
		return (
			<p
				onClick={this.props.handleClick}
			>
				{this.props.children}
			</p>
		);
	}
});

const Footer = React.createClass({
	render: function() {
		return (
			<p>
				Pomodoro Timer
			</p>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
