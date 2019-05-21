import timerWorker from "../../worker/index";
import {
  RESET_ACTION,
  TOGGLE_ACTION,
  SET_WORK_INTERVAL_ACTION,
  SET_BREAK_INTERVAL_ACTION
} from "../actions";

const webWorkerMiddleware = store => next => action => {
  const previousPlayState = store.getState().isPlaying;
  next(action);
  const currentPlayState = store.getState().isPlaying;

  if (previousPlayState === currentPlayState) {
    return;
  }

  switch (action.type) {
    case RESET_ACTION:
      return timerWorker.postMessage({
        action: "STOP"
      });
    case TOGGLE_ACTION:
      return timerWorker.postMessage({
        action: store.getState().isPlaying ? "START" : "STOP",
        time: store.getState().time
      });
    case SET_WORK_INTERVAL_ACTION:
    case SET_BREAK_INTERVAL_ACTION:
      timerWorker.postMessage({
        action: "START",
        time: store.getState().time
      });

      return timerWorker.postMessage({
        action: "STOP"
      });
  }
};

export default webWorkerMiddleware;
