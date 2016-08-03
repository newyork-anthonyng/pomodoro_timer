export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const SET_TIME = 'SET_TIME';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const TOGGLE_MODE = 'TOGGLE_MODE';
export const TOGGLE_SETTINGS_PANEL = 'TOGGLE_SETTINGS_PANEL';
export const TOGGLE_SOUND = 'TOGGLE_SOUND';

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

export function toggleMode() {
	return {
		type: TOGGLE_MODE
	};
};

export function toggleSettingsPanel() {
	return {
		type: TOGGLE_SETTINGS_PANEL
	};
};

export function toggleSound() {
	return {
		type: TOGGLE_SOUND
	};
};
