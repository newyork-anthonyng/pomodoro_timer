import store from "./store/index";
import {
  dispatchResetAction,
  dispatchTogglePlayAction,
  dispatchSetWorkIntervalAction,
  dispatchSetBreakIntervalAction,
  dispatchToggleWorkBreakIntervalAction
} from "./store/actions";
import SHORTCUT from "./shortcut";

const $playButton = document.querySelector(".js-play-button");
const $resetButton = document.querySelector(".js-reset-button");
const $workIntervalButton = document.querySelector(".js-work-interval-button");
const $breakIntervalButton = document.querySelector(".js-break-interval-button");

function setupEventListeners() {
  $playButton.addEventListener("click", function handlePlayButtonClick() {
    store.dispatch(dispatchTogglePlayAction());
  });

  $resetButton.addEventListener("click", function handleResetButtonClick() {
    store.dispatch(dispatchResetAction());
  });

  $workIntervalButton.addEventListener("click", function handleWorkIntervalButtonClick() {
    store.dispatch(dispatchSetWorkIntervalAction());
  });

  $breakIntervalButton.addEventListener("click", function handleBreakIntervalButtonClick() {
    store.dispatch(dispatchSetBreakIntervalAction());
  })

  document.addEventListener("keydown", function(e) {
    if (SHORTCUT.isPlayPause(e)) {
      e.preventDefault();
      store.dispatch(dispatchTogglePlayAction());
    } else if (SHORTCUT.isReset(e)) {
      e.preventDefault();
      store.dispatch(dispatchResetAction());
    } else if (SHORTCUT.isToggleInterval(e)) {
      e.preventDefault();
      store.dispatch(dispatchToggleWorkBreakIntervalAction());
    }
  });
}

setupEventListeners();
