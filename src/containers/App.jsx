import React from 'react';
import { connect } from 'react-redux';
import { TimeContainer } from './TimeContainer';
import { TimerLabels } from '../components/TimerLabels';
import { SettingsContainer } from './SettingsContainer';
import { Footer } from '../components/Footer';
import { startTimer, stopTimer, toggleSettingsPanel } from '../actions';

let App = React.createClass({
	playTimer: function() {
		console.log('play timer');
		this.props.startTimer();
	},

	resetTimer: function() {
		console.log('reset timer');
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
					handlePlayClick={this.playTimer}
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
