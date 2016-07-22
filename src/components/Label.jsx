const React = require('react');

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

module.exports = Label;
