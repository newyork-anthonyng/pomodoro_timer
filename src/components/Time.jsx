const React = require('react');

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

module.exports = Time;
