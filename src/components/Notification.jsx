import React from 'react';

const Notification = React.createClass({
	componentWillMount: function() {
		this.audio = null;
	},

	componentDidUpdate: function(prevProps) {
		if(prevProps.mode !== this.props.mode) {
			return this.playNotifications();
		}

		if(prevProps.sound !== this.props.sound) {
			this.audio.pause();
		}
	},

	playNotifications: function() {
		const { audioSource, sound } = this.props;

		for(let i = 0; i < 3; i++) {
			this.createNotification();
		}

		if(sound) {
			this.audio = new Audio(audioSource);
			this.audio.play();
		}
	},

	createNotification: function() {
		const { title } = this.props;

		const notificationOptions = {
			icon: this.props.image
		};
		const notification = new window.Notification(title, notificationOptions);
		setTimeout(notification.close.bind(notification), 2500);
	},

	render: function() {
		return null;
	}
});

export default Notification;
