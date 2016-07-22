const React = require('react');
const ReactDOM = require('react-dom');
const Time = require('./components/Time.jsx');
const ActionContainer = require('./containers/ActionContainer.jsx');
const Footer = require('./components/Footer.jsx');

const App = React.createClass({
	getInitialState: function() {
		return {
			isRunning: false,
			seconds: 0,
			mode: 'work',
			default: {
				'work': 5,
				'break': 2
			}
		};
	},

	componentWillMount: function() {
		this.intervals = [];
		this.setState({ seconds: this.state.default.work });
	},

	componentWillUnmount: function() {
		this.intervals.forEach(clearInterval);
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
		console.log('%c playing timer', 'background-color: lightgreen;');
		const timer = window.setInterval(this.tick, 1000);

		this.intervals.push(timer);
	},

	tick: function() {
		if(this.state.seconds <= 0) {
			if(this.state.mode === 'work') {
				this.setState({
					mode: 'break',
					seconds: this.state.default.break
				});
			} else if(this.state.mode === 'break') {
				this.setState({
					mode: 'work',
					seconds: this.state.default.work
				});
				this.pauseTimer();
			}
		} else {
			this.setState({ seconds: this.state.seconds - 1 });
		}
	},

	pauseTimer: function() {
		console.log('%c pausing timer', 'background-color: lightpink;');
		this.intervals.forEach(clearInterval);
		this.setState({ isRunning: false });
	},

	handleResetClick: function() {
		console.log('reset clicked');
		this.pauseTimer();
		this.setState({
			mode: 'work',
			seconds: this.state.default.work
		});
	},

	handleSettingsUpdate: function(newDefault) {
		console.log('updating default values');

		const newDefaults = Object.assign({}, this.state.default, newDefault);

		this.setState({ default: newDefaults });
	},

	render: function() {
		return (
			<div>
				<p>{this.state.isRunning ? 'Is Running' : 'Not Running'}</p>
				<Time seconds={this.state.seconds} />
				<ActionContainer
					handlePlayClick={this.handlePlayClick}
					handleResetClick={this.handleResetClick}
					isRunning={this.state.isRunning}
					handleSettingsUpdate={this.handleSettingsUpdate}
					default={this.state.default}
				/>
				<Footer>Pomodoro Timer</Footer>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
