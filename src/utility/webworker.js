let currentTime = 0;
let timer = null;

const startTimer = (time = 0) => {
  currentTime = time;
  timer = setInterval(tick, 1000);
};

const tick = () => {
  currentTime -= 1000;

  self.postMessage({
    action: 'TICK',
    time: currentTime,
  });

  if (currentTime <= 0) {
    stopTimer();
    self.postMessage({
      action: 'COMPLETE',
    });
  }
};

const stopTimer = () => {
  clearInterval(timer);
};

self.addEventListener('message', (e) => {
  switch(e.data.action) {
  case 'START':
    startTimer(e.data.time);
    break;
  case 'STOP':
    stopTimer();
    break;
  default:
    return;
  }
});
