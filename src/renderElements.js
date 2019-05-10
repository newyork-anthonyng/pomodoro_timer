import getTimeText from "./getTimeText";

export const renderPlayButton = playButtonElement => currentPlayState => {
  playButtonElement.innerText = currentPlayState ? "Pause" : "Play";
};

export const renderTimeElement = timeElement => currentTime => {
  timeElement.innerText = getTimeText(currentTime);
};

export const renderDocumentTitle = currentTime => {
  document.title = getTimeText(currentTime);
};
