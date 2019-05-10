import Worker from "worker-loader!../../worker";
import store from "../index";
import {
  RESET_ACTION,
  TOGGLE_ACTION,
  dispatchSetTimeAction,
  dispatchPauseAction
} from "../actions";

// Time is more accurate with webworker
const timerWorker = new Worker();
timerWorker.onmessage = e => {
  switch(e.data.action) {
    case "TICK":
      return store.dispatch(dispatchSetTimeAction(e.data.time));
    case "COMPLETE":
      return store.dispatch(dispatchPauseAction());
    default:
      break;
  }
};

export const webWorkerMiddleware = store => next => action => {
  const previousPlayState = store.getState().isPlaying;
  next(action);
  const currentPlayState = store.getState().isPlaying;

  if (previousPlayState === currentPlayState) {
    return;
  }

  if (action.type === RESET_ACTION) {
    timerWorker.postMessage({
      action: "STOP"
    });
  } else if (action.type === TOGGLE_ACTION) {
    timerWorker.postMessage({
      action: store.getState().isPlaying ? "START" : "STOP",
      time: store.getState().time
    });
  }
};
