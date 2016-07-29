import React from 'react';

const Notification = React.createClass({
	shouldComponentUpdate: function(nextProps) {
		return nextProps.mode !== this.props.mode;
	},

	componentDidUpdate: function() {
		const { title, audioSource } = this.props;

		let notification = new window.Notification(title);
		setTimeout(notification.close.bind(notification), 2500);

		const audio = new Audio(audioSource);
		audio.play();
	},

	render: function() {
		return null;
	}
});

export default Notification;
