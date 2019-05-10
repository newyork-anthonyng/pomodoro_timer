export const RESET_ACTION = "reset_action";
export const SET_TIME_ACTION = "set_time_action";
export const TOGGLE_ACTION = "toggle_action";

export const dispatchTogglePlayAction = () => ({ type: TOGGLE_ACTION });
export const dispatchResetAction = () => ({ type: RESET_ACTION });
export const dispatchSetTimeAction = (time) => ({
  type: SET_TIME_ACTION,
  data: time
});
