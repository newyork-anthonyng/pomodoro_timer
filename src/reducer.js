import {
	START_TIMER,
	STOP_TIMER,
	SET_TIME,
	UPDATE_SETTINGS,
	TOGGLE_MODE,
	TOGGLE_SETTINGS_PANEL
} from './actions';

const DEFAULT_WORK_SETTING = 25 * 60;
const DEFAULT_BREAK_SETTING = 5 * 60;

const initialData = {
	isRunning: false,
	seconds: DEFAULT_WORK_SETTING,
	mode: 'work',
	settingsPanelOpen: false,
	default: {
		work: DEFAULT_WORK_SETTING,
		break: DEFAULT_BREAK_SETTING
	}
};

export default function(state = initialData, action) {
	switch(action.type) {
		case START_TIMER:
			console.log('start_timer');
			return Object.assign({}, state, {
				isRunning: !state.isRunning
			});
		case STOP_TIMER:
			console.log('stop_timer');
			return Object.assign({}, state, {
				isRunning: false
			});
		case SET_TIME:
			console.log('setting_time');
			return Object.assign({}, state, {
				seconds: action.seconds
			});
		case UPDATE_SETTINGS:
			console.log('update_settings');
			const newSettings = Object.assign({}, state.default, action.settings);
			return Object.assign({}, state, {
				default: newSettings
			});
		case TOGGLE_MODE:
			console.log('toggling_mode');
			const newMode = state.mode === 'work' ? 'break' : 'work';
			return Object.assign({}, state, {
				mode: newMode
			});
		case TOGGLE_SETTINGS_PANEL:
			console.log('toggle settings panel');
			console.log(state.settingsPanelOpen);
			return Object.assign({}, state, {
				settingsPanelOpen: !state.settingsPanelOpen
			});
		default:
			return state;
	};
};
