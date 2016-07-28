import { START_TIMER, STOP_TIMER, SET_TIME, UPDATE_SETTINGS, SET_COMPLETE } from './actions';

const DEFAULT_WORK_SETTING = 25 * 60;
const DEFAULT_BREAK_SETTING = 5 * 60;

const initialData = {
	isRunning: false,
	seconds: 25 * 60,
	mode: 'work',
	default: {
		work: DEFAULT_WORK_SETTING,
		break: DEFAULT_BREAK_SETTING
	}
};

export default function(state = initialData, action) {
	switch(action.type) {
		case START_TIMER:
		case STOP_TIMER:
		case UPDATE_SETTINGS:
		case SET_COMPLETE:
		default:
			return state;
	};
};
