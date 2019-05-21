import Worker from "worker-loader!./worker";
import store from "../store/index";
import {
  dispatchSetTimeAction,
  dispatchPauseAction,
} from "../store/actions";

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

export default timerWorker;