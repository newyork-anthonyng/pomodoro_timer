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
			<div id="actions">
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
					work={this.props.work}
					break={this.props.break}
					onUpdate={this.props.handleSettingsUpdate}
				/>
			</div>
		);
	}
});

module.exports = ActionContainer;
