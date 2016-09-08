import React from 'react';

const Notification = React.createClass({
	shouldComponentUpdate: function(nextProps) {
		return nextProps.mode !== this.props.mode;
	},

	componentDidUpdate: function() {
		const { audioSource, sound } = this.props;

		for(let i = 0; i < 3; i++) {
			this.createNotification();
		}

		if(sound) {
			const audio = new Audio(audioSource);
			audio.play();
		}
	},

	createNotification: function() {
		const { title } = this.props;

		let notification = new window.Notification(title);
		setTimeout(notification.close.bind(notification), 2500);
	},

	render: function() {
		const { audioSource } = this.props;

		if(audioSource) {
			const audioStyle = {
				display: 'none'
			};

			return (
				<audio style={audioStyle}>
					<source src={audioSource} />
				</audio>
			);
		} else {
			return null;
		}
	}
});

export default Notification;
