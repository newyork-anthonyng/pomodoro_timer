import {
  PAUSE_ACTION,
  TOGGLE_ACTION,
  RESET_ACTION,
  SET_TIME_ACTION,
  SET_WORK_INTERVAL_ACTION,
  SET_BREAK_INTERVAL_ACTION
} from "./actions";

export const initialState = {
  mode: "work",
  isPlaying: false,
  time: 25 * 60,
  workInterval: 25 * 60,
  breakInterval: 5 * 60
};

const reducerFunction = (state = initialState, action = {}) => {
  switch (action.type) {
    case PAUSE_ACTION:
      return {
        ...state,
        isPlaying: false
      };
    case TOGGLE_ACTION:
      const userHitsPlayAndTimerIsFinished = state.time === 0 && !state.isPlaying;
      if (userHitsPlayAndTimerIsFinished) {
        const { workInterval, breakInterval } = initialState;
        const newTime = state.mode === "work" ? workInterval : breakInterval;

        return {
          ...state,
          isPlaying: true,
          time: newTime
        };
      }
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case RESET_ACTION:
      const { mode, workInterval, breakInterval } = state;
      const newTime = mode === "work" ? workInterval : breakInterval;

      return {
        ...state,
        time: newTime,
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
