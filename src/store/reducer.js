import {
  RESET_ACTION,
  SET_TIME_ACTION,
  TOGGLE_ACTION
} from "./actions";

const initialState = {
  isPlaying: false,
  time: 25 * 60
};

const reducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTION:
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
    default:
        return state;
  }
};

export default reducerFunction;
