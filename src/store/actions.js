export const TOGGLE_ACTION = "toggle_action";
export const PAUSE_ACTION = "pause_action";
export const RESET_ACTION = "reset_action";
export const SET_TIME_ACTION = "set_time_action";
export const SET_WORK_INTERVAL_ACTION = "set_work_interval_action";
export const SET_BREAK_INTERVAL_ACTION = "set_break_interval_action";

export const dispatchTogglePlayAction = () => ({ type: TOGGLE_ACTION });
export const dispatchPauseAction = () => ({ type: PAUSE_ACTION });
export const dispatchResetAction = () => ({ type: RESET_ACTION });
export const dispatchSetTimeAction = (time) => ({
  type: SET_TIME_ACTION,
  data: time
});
export const dispatchSetWorkIntervalAction = () => ({ type: SET_WORK_INTERVAL_ACTION });
export const dispatchSetBreakIntervalAction = () => ({ type: SET_BREAK_INTERVAL_ACTION });
