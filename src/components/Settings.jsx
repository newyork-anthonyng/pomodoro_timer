const React = require('react');

const Settings = React.createClass({
	handleWorkChange: function(e) {
		this.handleChange(e.target.value, 'work');
	},

	handleBreakChange: function(e) {
		this.handleChange(e.target.value, 'break');
	},

	handleChange: function(value, mode) {
		const newDefault = {};
		newDefault[mode] = value;
		this.props.onUpdate(newDefault);
	},

	render: function() {
		if(this.props.show) {
			return (
				<div id="settings">
					<p>Work</p>
					<input
						type="number"
						min="1"
						max="60"
						value={this.props.work}
						onChange={this.handleWorkChange}
					/>
					<br />
					<p>Break</p>
					<input
						type="number"
						min="1"
						max="60"
						value={this.props.break}
						onChange={this.handleBreakChange}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
});

module.exports = Settings;
