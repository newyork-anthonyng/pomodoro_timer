const React = require('react');

const Time = React.createClass({
	render: function() {
		return (
			<div id="time">
				<p>{this.props.seconds}</p>
			</div>
		);
	}
});

module.exports = Time;
