'use strict';

let allNotifications = [];
const myColors = [
  '#8ADCB3', '#86E3E9', '#8CF3DD', '#8CF3A3', '#8EE986', '#C394DC', '#E991CA',
  '#EC97F3', '#BA97F3', '#9A91E9', '#DC9F88', '#E9BD85', '#F3B68B', '#F3988B',
  '#E9858B', '#DCD988', '#AEE984', '#DAF38A', '#F3E58A', '#E9D184', '#12E1FF',
  '#10E8C9', '#1EFF9F', '#10E84E', '#12FF13', '#FF314D', '#E82DA4', '#F13EFF',
  '#A72DE8', '#7F31FF', '#FFD032', '#FFAB3F', '#E8602E', '#FF3243', '#E8040D'
];

const PLAY_BUTTON = './assets/images/playButton.png';
const PAUSE_BUTTON = './assets/images/pauseButton.png';
const RESET_BUTTON = './assets/images/resetButton.png';
const SETTINGS_BUTTON = './assets/images/settingsButton.png';
const HOVER_PLAY_BUTTON = './assets/images/hover_playButton.png';
const HOVER_PAUSE_BUTTON = './assets/images/hover_pauseButton.png';
const HOVER_RESET_BUTTON = './assets/images/hover_resetButton.png';
const HOVER_SETTINGS_BUTTON = './assets/images/hover_settingsButton.png';

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

      playAudio();
      changeBackgroundColor();
    }
  });
});

function changeBackgroundColor() {
  // choose a random color
  const max = myColors.length;
  const randomNumber = Math.floor(Math.random() * max);

  // change the background color
  $('body').css('background-color', myColors[randomNumber]);
}

function playAudio() {
  const audio = new Audio('./assets/beep.wav');

  for(let i = 0; i < 3; i++) {
    setTimeout(function() {
      audio.play();
    }, i * 750);
  }
}

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
  if(!display) {
    return;
  }

  let $play_pause = $('.play-pause');
  $play_pause.empty();

  let myHtml;

  if(display === 'play') {
    myHtml = '<img src="' + PLAY_BUTTON + '" alt="Play Button" />';
  } else if(display === 'pause'){
    myHtml = '<img src="' + PAUSE_BUTTON + '" alt="Pause Button" />';
  }

  $play_pause.append(myHtml);
}

// *** timer module ************************************************************
var timer = (function() {
  let webworker;

  const time = {
    work: 25 * 60,
    break: 5 * 60
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
  const giphyKeyword = $('#giphy-search').val() || 'random';
  const myUrl = '/giphy?keyword=' + giphyKeyword;

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


// *** Modal ******************************************************************
$(function() {
  const $modal = $('.modal');
  const $button = $('#openModal');
  const $close = $('.close');
  const $giphySearch = $('#giphy-search');

  // open modal
  $button.click(function() {
    $modal.fadeIn(400);
    $giphySearch.focus();
  });

  // close modal
  $close.click(function() {
    hideModal();
  });

  $giphySearch.keyup(function(e) {
    const enterKeyPressed = e.which  === 13;
    const escapeKeyPressed = e.which === 27;

    if(enterKeyPressed || escapeKeyPressed) hideModal();
  });

  $(window).click(function(e) {
    // user clicks on background of modal
    if(e.target == $modal[0]) {
      hideModal();
    }
  });

  function hideModal() {
    $modal.fadeOut(400);
  }
});

// *** Hover Effects ******************************************************************
$(function() {
  $('.play-pause img').hover(function() {
    const currentImage = $(this).attr('src');
    
    if(currentImage === PLAY_BUTTON) {
      $(this).attr('src', HOVER_PLAY_BUTTON);
    } else {
      $(this).attr('src', HOVER_PAUSE_BUTTON);
    }
  }, function() {
    const currentImage = $(this).attr('src');

    if(currentImage === HOVER_PLAY_BUTTON) {
      $(this).attr('src', PLAY_BUTTON);
    } else {
      $(this).attr('src', PAUSE_BUTTON);
    }
  });

  $('.reset img').hover(function() {
    $(this).attr('src', HOVER_RESET_BUTTON);
  }, function() {
    $(this).attr('src', RESET_BUTTON);
  });
});
