import {
  PAUSE_ACTION,
  TOGGLE_ACTION,
  RESET_ACTION,
  SET_TIME_ACTION,
  SET_WORK_INTERVAL_ACTION,
  SET_BREAK_INTERVAL_ACTION
} from "./actions";

const initialState = {
  mode: "work",
  isPlaying: false,
  time: 25 * 60,
  workInterval: 25 * 60,
  breakInterval: 5 * 60
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case PAUSE_ACTION:
      return {
        ...state,
        isPlaying: false
      };
    case TOGGLE_ACTION:
      // restart timer when user hits "play" when timer has finished
      if (state.time === 0 && !state.isPlaying) {
        return {
          ...state,
          isPlaying: true,
          time: 2
        };
      }
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case RESET_ACTION:
      return {
        ...state,
        time: initialState.time,
        isPlaying: false
      };
    case SET_TIME_ACTION:
      return {
        ...state,
        time: action.data
      };
    case SET_WORK_INTERVAL_ACTION:
      return {
        ...state,
        mode: "work",
        isPlaying: false,
        time: initialState.workInterval
      };
    case SET_BREAK_INTERVAL_ACTION:
      return {
        ...state,
        mode: "break",
        isPlaying: false,
        time: initialState.breakInterval
      };
    default:
        return state;
  }
};

export default reducerFunction;
