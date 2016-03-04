'use strict';

$(function() {
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

  timer.initTimer(function(data) {
    let action = data['action'];
    let time = data['time'];

    updateDisplay(time);

    if(action === 'finish') {
      updateButton('play');
      setUpNotifications();
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
  let $play_pause = $('.play-pause');
  $play_pause.empty();

  let myHtml;

  if(display === 'play') {
    myHtml = '<span class="icon-play3"></span>';
  } else {
    myHtml = '<span class="icon-pause2"></span>';
  }

  $play_pause.append(myHtml);
}

/// *** timer module ***********************************************************
var timer = (function() {
  let webworker;

  const time = {
    work: 25 * 60,
    break: 5 * 60
  };

  let currentMode = 'work';  // 'work', 'break'
  let playing = false;

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
  };

  obj.setTimer = function(mode) {
    currentMode = mode;

    var data = {
      action: 'set',
      time: time[currentMode]
    };

    webworker.postMessage(data);
    playing = false;

  };
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
    console.log('Desktop notifications not available');
    return;
  }

  if(Notification.permission !== 'granted') {
    console.log('Requesting permission');
    Notification.requestPermission();
  } else {
    console.log('New notification');
    var notification = new Notification('Timer Finished', {
      icon: url,
      body: 'Take a break!'
    });

    notification.onclick = function() {
      window.open(url);
    }
  }
}
