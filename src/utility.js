const Utility = {
	formatTime: function(seconds) {
		let minutes = parseInt(seconds / 60);
		minutes = minutes.length < 2 ? '0' + minutes : minutes;
		seconds = seconds % 60 + '';
		seconds = seconds.length < 2 ? '0' + seconds : seconds;

		return minutes + ':' + seconds;
	},

	convertMinutesToSeconds: function(minutes) {
		return minutes * 60;
	},

	convertSecondsToMinutes: function(seconds) {
		return parseInt(seconds / 60);
	}
};

module.exports = Utility;
