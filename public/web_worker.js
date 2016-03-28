'use strict';

onmessage = function(e) {
  let action = e.data['action'];
  let time = e.data['time'];

  switch(action) {
    case 'play':
      timerWebWorker.playTimer();
      break;
    case 'pause':
      timerWebWorker.pauseTimer();
      break;
    case 'reset':
      timerWebWorker.resetTimer(time);
      break;
    case 'set':
      timerWebWorker.setTimer(time);
      break;
  };
}

let timerWebWorker = (function() {
  const my = {};
  let timerId;
  let i = 25 * 60;
  let rang = false;

  // timer ticks
  my.timedCount = function() {
    i--;

    timerId = setTimeout(function() {
      my.timedCount();
    }, 1000);

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

  my.setTimer = function(startingTime) {
    my.pauseTimer();
    i = startingTime;

    var data = {
      action: 'set',
      time: startingTime
    };
    postMessage(data);
    rang = false;
  }

  my.playTimer = function() {
    my.timedCount();

    var data = {
      action: 'play',
      time: i
    };
    postMessage(data);
  }

  my.pauseTimer = function() {
    clearTimeout(timerId);

    var data = {
      action: 'pause',
      time: i
    };
    postMessage(data);
  }

  my.resetTimer = function(startingTime) {
    my.pauseTimer();
    my.setTimer(startingTime);

    var data = {
      action: 'reset',
      time: startingTime
    }
    postMessage(data);
    rang = false;
  }

  return my;
}());
