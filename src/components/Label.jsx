const React = require('react');

const Label = React.createClass({
	render: function() {
		return (
			<div className="label">
				<p
					onClick={this.props.handleClick}
				>
					{this.props.children}
				</p>
			</div>
		);
	}
});

module.exports = Label;
