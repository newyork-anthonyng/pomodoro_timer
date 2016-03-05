'use strict';

let allNotifications = [];

$(function() {
  // *** Request necessary permissions *****************************************
  if(Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  // *** click events **********************************************************
  $('.play-pause').click(function() {
    var play_pause = timer.playPressed();
    updateButton(play_pause);
  });

  $('.reset').click(function() {
    timer.resetTimer();
    updateButton('play');
  });

  $('#work').click(function() {
    timer.setTimer('work');
    updateButton('play');
  });

  $('#break').click(function() {
    timer.setTimer('break');
    updateButton('play');
  });

  // *** call back for Web Worker **********************************************
  // This is called back every time the Web Work sends a message
  timer.initTimer(function(data) {
    let action = data['action'];
    let time = data['time'];

    updateDisplay(time);

    // as soon as timer is finished, play the notifications and update the play button
    if(action === 'finish') {
      timer.timerFinished();
      updateButton('play');
      setUpNotifications();

      // play audio
      const audio = new Audio('./assets/beep.wav');
      for(var i = 0; i < 3; i++) {
        setTimeout(function() {
          audio.play();
        }, i * 500);
      }
    }
  });
});

function updateDisplay(time) {
  const myTime = formatTime(time);
  $('.timer').text(myTime);

  document.title = 'Timer (' + myTime + ')';
}

function formatTime(timeInSeconds) {
  var minutes = parseInt(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  seconds = String(seconds).length > 1 ? seconds : '0' + seconds;

  return minutes + ':' + seconds;
}

function updateButton(display) {
  console.log('display: ' + display);
  if(!display) {
    console.log('exiting updateButton');
    return;
  }

  let $play_pause = $('.play-pause');
  $play_pause.empty();

  let myHtml;

  if(display === 'play') {
    myHtml = '<span class="icon-play3"></span>';
  } else if(display === 'pause'){
    myHtml = '<span class="icon-pause2"></span>';
  }

  $play_pause.append(myHtml);
}

// *** timer module ************************************************************
var timer = (function() {
  let webworker;

  const time = {
    work: 25 * 60,
    // break: 5 * 60
    break: 10
  };

  let currentMode = 'work';  // 'work', 'break'
  let playing = false;
  let finished = false;

  let obj = {};

  obj.initTimer = function(callback) {
    if(typeof(Worker) !== 'undefined') {
      webworker = new Worker('web_worker.js');

      webworker.onmessage = function(event) {
        callback(event.data);
      }
    }
  };

  obj.playPressed = function() {
    // if timer has finished and play button is pressed,
    // restart the timer and play it
    if(finished) {
      finished = false;
      obj.resetTimer();
      obj.playTimer();
      return 'pause';
    }

    if(playing) {
      obj.pauseTimer();
      return 'play';
    } else {
      obj.playTimer();
      return 'pause';
    }
  };

  obj.playTimer = function() {
    webworker.postMessage({action: 'play'});
    playing = true;
  };

  obj.pauseTimer = function() {
    webworker.postMessage({action: 'pause'});
    playing = false;
  };

  obj.resetTimer = function() {
    var data = {
      action: 'reset',
      time: time[currentMode]
    }
    webworker.postMessage(data);
    playing = false;
    finished = false;
  };

  obj.setTimer = function(mode) {
    currentMode = mode;

    var data = {
      action: 'set',
      time: time[currentMode]
    };

    webworker.postMessage(data);
    playing = false;
    finished = false;
  };

  obj.timerFinished = function() {
    playing = false;
    finished = true;
  };

  obj.test = function() {
    return {
      finished: finished,
      playing: playing
    }
  }

  return obj;
}());

// *** Notifications ***********************************************************
function setUpNotifications() {
  // grab giphy
  const myUrl = '/giphy';
  $.ajax({
    url: myUrl,
    method: 'GET'
  }).done(function(data) {
    notifyMe(data['URL']);
    notifyMe(data['URL']);
    notifyMe(data['URL']);
  });
}

function notifyMe(url) {
  if(!Notification) {
    return;
  }

  if(Notification.permission !== 'granted') {
    Notification.requestPermission();
  } else {
    var notification = new Notification('Timer Finished', {
      icon: url,
      body: 'Take a break!'
    });

    allNotifications.push(notification);

    notification.onclick = function() {
      for(let i = 0; i < allNotifications.length; i++) {
        allNotifications[i].close();
      }
      window.open(url);
    }
  }
}
