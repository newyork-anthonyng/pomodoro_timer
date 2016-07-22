const React = require('react');
const Label = require('../components/Label.jsx');

const ActionContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Label handleClick={this.props.handlePlayClick}>
					{this.props.isRunning ? 'Pause' : 'Play'}
				</Label>

				<Label handleClick={this.props.handleResetClick}>
					Reset
				</Label>

				<Label handleClick={this.props.handleSettingsClick}>
					Settings
				</Label>
			</div>
		);
	}
});

module.exports = ActionContainer;
