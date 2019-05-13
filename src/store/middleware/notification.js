let isNotificationGranted = false;

if (!("Notification" in window)) {
  console.error("Browser does not support desktop notifications");
} else if (window.Notification.permission === "granted") {
  isNotificationGranted = true;
} else if (window.Notification.permission !== "denied") {
  window.Notification.requestPermission()
    .then(result => {
      if (result === "grant") {
        isNotificationGranted = true;
      }
    });
}

function createNotification() {
  if (!isNotificationGranted) {
    return;
  }

  const notificationOptions = {
    body: "",
    requireInteraction: true
  };

  new window.Notification(
    "Pomodoro Timer expired",
    notificationOptions
  );
}

const notificationMiddleware = store => next => action => {
  const previousPlayState = store.getState().isPlaying;
  next(action);
  const currentPlayState = store.getState().isPlaying;

  const didTimerStop = previousPlayState && !currentPlayState;
  const didTimerExpire = store.getState().time === 0;
  if (didTimerStop && didTimerExpire) {
    createNotification();
  }
};

export default notificationMiddleware;
