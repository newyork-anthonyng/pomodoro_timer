import store from "./store/index";
import {
  dispatchResetAction,
  dispatchTogglePlayAction
} from "./store/actions";
import {
  renderPlayButton,
  renderTimeElement,
  renderDocumentTitle
} from "./renderElements";

const timeElement = document.querySelector(".js-timer");
const playButtonElement = document.querySelector(".js-play-button");
const resetButtonElement = document.querySelector(".js-reset-button");

function setupEventListeners() {
  playButtonElement.addEventListener("click", function handlePlayButtonClick() {
    store.dispatch(dispatchTogglePlayAction());
  });

  resetButtonElement.addEventListener("click", function handleResetButtonClick() {
    store.dispatch(dispatchResetAction());
  });
}

setupEventListeners();
