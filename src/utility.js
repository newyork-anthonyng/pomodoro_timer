export default (function() {
	function formatTime(seconds) {
		let minutes = parseInt(seconds / 60);
		minutes = minutes.length < 2 ? '0' + minutes : minutes;
		seconds = seconds % 60 + '';
		seconds = seconds.length < 2 ? '0' + seconds : seconds;

		return minutes + ':' + seconds;
	};

	function convertMinutesToSeconds(minutes) {
		return minutes * 60;
	};

	function convertSecondsToMinutes(seconds) {
		return parseInt(seconds / 60);
	};

	function displayNotification(title, body) {
		if(!('Notification' in window)) return;

		if(Notification.permission === 'denied') {
			return Notification.requestPermission((permission) => {
				if(permission === 'granted') {
					showNotification(title, body);
				}
			});
		}

		showNotification(title, body);
	};

	function showNotification(title, body) {
		new Notification(title, {
			body: body
		});
	};

	return {
		formatTime: formatTime,
		convertMinutesToSeconds: convertMinutesToSeconds,
		convertSecondsToMinutes: convertSecondsToMinutes,
		displayNotification: displayNotification
	};
})();
