import store from "./store/index";
import {
  dispatchResetAction,
  dispatchTogglePlayAction,
  dispatchSetWorkIntervalAction
} from "./store/actions";
import {
  renderPlayButton,
  renderTimeElement,
  renderDocumentTitle
} from "./renderElements";

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
}

console.log($workIntervalButton, $breakIntervalButton);

setupEventListeners();
