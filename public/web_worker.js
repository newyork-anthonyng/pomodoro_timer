'use strict';
let timerId;
let i = 25 * 60;
let rang = false;

// timer ticks
function timedCount() {
  i--;
  timerId = setTimeout('timedCount()', 1000);

  let data = {};

  // timer has elapsed
  if(i <= 0) {

    if(!rang) {
      data = {
        action: 'finish',
        time: 0
      };
      rang = true;
      postMessage(data);
    }
  } else {
    data = {
      action: 'update',
      time: i
    };
    postMessage(data);
  }

}

onmessage = function(e) {
  let action = e.data['action'];
  let time = e.data['time'];

  switch(action) {
    case 'play':
      playTimer();
      break;
    case 'pause':
      pauseTimer();
      break;
    case 'reset':
      resetTimer(time);
      break;
    case 'set':
      setTimer(time);
      break;
  };
}

function setTimer(startingTime) {
  pauseTimer();
  i = startingTime;

  var data = {
    action: 'set',
    time: startingTime
  };
  postMessage(data);
  rang = false;
}

function playTimer() {
  timedCount();

  var data = {
    action: 'play',
    time: i
  };
  postMessage(data);
}

function pauseTimer() {
  clearTimeout(timerId);

  var data = {
    action: 'pause',
    time: i
  };
  postMessage(data);
}

function resetTimer(startingTime) {
  pauseTimer();
  setTimer(startingTime);

  var data = {
    action: 'reset',
    time: startingTime
  }
  postMessage(data);
  rang = false;
}
