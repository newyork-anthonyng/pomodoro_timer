export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const SET_TIME = 'SET_TIME';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SET_COMPLETE = 'SET_COMPLETE';

export function startTimer() {
	return {
		type: START_TIMER
	};
};

export function stopTimer() {
	return {
		type: STOP_TIMER
	};
};

export function setTime(seconds) {
	return {
		type: SET_TIME,
		seconds: seconds
	};
};

export function updateSettings(newSettings) {
	return {
		type: UPDATE_SETTINGS,
		settings: newSettings
	};
};

export function setComplete() {
	return {
		type: SET_COMPLETE
	};
};
