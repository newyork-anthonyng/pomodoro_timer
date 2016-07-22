const React = require('react');
const Label = require('../components/Label.jsx');
const Settings = require('../components/Settings.jsx');

const ActionContainer = React.createClass({
	getInitialState: function() {
		return {
			showSettings: false
		}
	},

	handleSettingsClick: function() {
		this.setState({ showSettings: !this.state.showSettings });
	},

	render: function() {
		return (
			<div>
				<Label handleClick={this.props.handlePlayClick}>
					{this.props.isRunning ? 'Pause' : 'Play'}
				</Label>

				<Label handleClick={this.props.handleResetClick}>
					Reset
				</Label>

				<Label handleClick={this.handleSettingsClick}>
					Settings
				</Label>

				<Settings
					show={this.state.showSettings}
					work={this.props.default.work}
					break={this.props.default.break}
					onUpdate={this.props.handleSettingsUpdate}
				/>
			</div>
		);
	}
});

module.exports = ActionContainer;
