import {
  PAUSE_ACTION,
  TOGGLE_ACTION,
  RESET_ACTION,
  SET_TIME_ACTION,
  SET_WORK_INTERVAL_ACTION
} from "./actions";

const initialState = {
  mode: "work",
  isPlaying: false,
  // time: 25 * 60
  time: 2,
  workInterval: 2,
  breakInterval: 2
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
        time: 25 * 60
      };
    default:
        return state;
  }
};

export default reducerFunction;
