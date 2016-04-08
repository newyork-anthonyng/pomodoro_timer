'use strict';

const PLAY_BUTTON = './assets/images/playButton.png';
const PAUSE_BUTTON = './assets/images/pauseButton.png';
const RESET_BUTTON = './assets/images/resetButton.png';
const SETTINGS_BUTTON = './assets/images/settingsButton.png';
const HOVER_PLAY_BUTTON = './assets/images/hover_playButton.png';
const HOVER_PAUSE_BUTTON = './assets/images/hover_pauseButton.png';
const HOVER_RESET_BUTTON = './assets/images/hover_resetButton.png';
const HOVER_SETTINGS_BUTTON = './assets/images/hover_settingsButton.png';

$(function() {
  requestNotificationPermission();
  setUpClickEvents();
  setUpHoverEvents();
  initializeTimer();
  setUpModalEvents();
  setUpKeyboardShortcuts();
});

function requestNotificationPermission() {
  if(Notification && Notification.permission !== 'granted') {
    Notification.requestPermission();
    return;
  }
}

function setUpClickEvents() {
  setPlayButtonClickEvent();
  setResetButtonClickEvent();
  setWorkButtonClickEvent();
  setBreakButtonClickEvent();
}

function setPlayButtonClickEvent() {
  $('.play-pause').click(function() {
    var play_pause = timer.playPressed();
    updateButton(play_pause);
  });
}

function setResetButtonClickEvent() {
  $('.reset').click(function() {
    timer.resetTimer();
    updateButton('play');
  });
}

function setWorkButtonClickEvent() {
  $('#work').click(function() {
    timer.setTimer('work');
    updateButton('play');
  });
}

function setBreakButtonClickEvent() {
  $('#break').click(function() {
    timer.setTimer('break');
    updateButton('play');
  });
}

function setUpHoverEvents() {
  setPlayButtonHoverEvent();
  setResetButtonHoverEvent();
}

function setPlayButtonHoverEvent() {
  $('.play-pause img').hover(function() {
    const currentImage = $(this).attr('src');
    setHoverPlayPauseImage(currentImage);
  }, function() {
    const currentImage = $(this).attr('src');
    setNormalPlayPauseImage(currentImage);
  });
}

function setHoverPlayPauseImage(currentImage) {
  const $playButtonImage = $('.play-pause img');

  if(currentImage === PLAY_BUTTON) {
    $playButtonImage.attr('src', HOVER_PLAY_BUTTON);
  } else {
    $playButtonImage.attr('src', HOVER_PAUSE_BUTTON);
  }
}

function setNormalPlayPauseImage(currentImage) {
  const $playButtonImage = $('.play-pause img');
  const isPlayButtonShowing = currentImage === HOVER_PLAY_BUTTON ||
                              currentImage === PLAY_BUTTON;

  if(isPlayButtonShowing) {
    $playButtonImage.attr('src', PLAY_BUTTON);
  } else {
    $playButtonImage.attr('src', PAUSE_BUTTON);
  }
}

function setResetButtonHoverEvent() {
  $('.reset img').hover(function() {
    $(this).attr('src', HOVER_RESET_BUTTON);
  }, function() {
    $(this).attr('src', RESET_BUTTON);
  });
}

function initializeTimer() {
  timer.initTimer(function(data) {
    let action = data['action'];
    let time = data['time'];

    updateDisplay(time);

    if(action === 'finish') setUpTimerFinishedEvents();
  });
}

function setUpTimerFinishedEvents() {
  timer.timerFinished();
  updateButton('play');
  setUpNotifications();

  playAudio();
  colorFactory.changeBackgroundColor();
}

function setUpModalEvents() {
  setUpModalClickEvents();
  setUpModalKeyPressEvent();
}

function setUpModalClickEvents() {
  setUpOpenModalClickEvent();
  setUpCloseModalClickEvent();
}

function setUpOpenModalClickEvent() {
  $('#openModal').click(function() {
    $('.modal.settings').fadeIn(400);
    $('#giphy-search').focus();
  });
}

function setUpCloseModalClickEvent() {
  $('.close').click(function() {
    closeModalPopup();
  });

  $(window).click(function(e) {
    // user clicks on background of modal
    if(e.target == $('.modal.settings')[0]) closeModalPopup();
  });
}

function closeModalPopup() {
  hideModalPopup();
  updateWorkAndBreakTime();
  initializeTimer();
  timer.resetTimer();
  updateButton('play');
}

function hideModalPopup() {
  $('.modal.settings').fadeOut(400);
}

function updateWorkAndBreakTime() {
  const workTimeInterval = $('#work-time-interval').val() * 60;
  const breakTimeInterval = $('#break-time-interval').val() * 60;

  timer.setWorkInterval(workTimeInterval);
  timer.setBreakInterval(breakTimeInterval);
}

function setUpModalKeyPressEvent() {
  $(document).keyup(function(e) {
    if(isEnterOrEscapeKeyPressed(e)) closeModalPopup();
  });
}

function isEnterOrEscapeKeyPressed(event) {
  const enterKeyPressed = event.which  === 13;
  const escapeKeyPressed = event.which === 27;

  return enterKeyPressed || escapeKeyPressed;
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
  const minutes = parseInt(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  seconds = String(seconds).length > 1 ? seconds : '0' + seconds;

  return minutes + ':' + seconds;
}

function updateButton(display) {
  if(!display) return;

  const $play_pause = $('.play-pause img');

  if(display === 'play') {
    $play_pause.attr('src', PLAY_BUTTON);
    $play_pause.attr('alt', 'Play Button');
  } else if(display === 'pause'){
    $play_pause.attr('src', PAUSE_BUTTON);
    $play_pause.attr('alt', 'Pause Button');
  }
}

var timer = (function() {
  let webworker;

  let time = {
    work: 25 * 60,
    break: 5 * 60
  };

  let currentMode = 'work';  // 'work', 'break'
  let timerIsPlaying = false;
  let timerIsFinished = false;

  let obj = {};

  obj.initTimer = function(callback) {
    if(typeof(Worker) !== 'undefined') {
      webworker = new Worker('web_worker.js');

      webworker.onmessage = function(event) {
        callback(event.data);
      }
    }
  };

  obj.setWorkInterval = function(workInterval) {
    time.work = workInterval;
  };

  obj.setBreakInterval = function(breakInterval) {
    time.break = breakInterval;
  };

  obj.playPressed = function() {
    if(timerIsFinished) {
      return obj.restartAndPlayTimer();
    } else {
      return obj.toggleTimerBetweenPlayAndPause();
    }
  };

  obj.restartAndPlayTimer = function() {
    timerIsFinished = false;
    obj.resetTimer();
    obj.playTimer();

    return 'pause';
  }

  obj.toggleTimerBetweenPlayAndPause = function() {
    if(timerIsPlaying) {
      obj.pauseTimer();
      return 'play';
    } else {
      obj.playTimer();
      return 'pause';
    }
  }

  obj.playTimer = function() {
    webworker.postMessage({action: 'play'});
    timerIsPlaying = true;
  };

  obj.pauseTimer = function() {
    webworker.postMessage({action: 'pause'});
    timerIsPlaying = false;
  };

  obj.resetTimer = function() {
    var data = {
      action: 'reset',
      time: time[currentMode]
    }
    webworker.postMessage(data);
    timerIsPlaying = false;
    timerIsFinished = false;
  };

  obj.setTimer = function(mode) {
    currentMode = mode;

    var data = {
      action: 'set',
      time: time[currentMode]
    };

    webworker.postMessage(data);
    timerIsPlaying = false;
    timerIsFinished = false;
  };

  obj.timerFinished = function() {
    timerIsPlaying = false;
    timerIsFinished = true;
  };

  return obj;
}());

var colorFactory = (function() {
  const myColors = [
    '#8ADCB3', '#86E3E9', '#8CF3DD', '#8CF3A3', '#8EE986', '#C394DC', '#E991CA',
    '#EC97F3', '#BA97F3', '#9A91E9', '#DC9F88', '#E9BD85', '#F3B68B', '#F3988B',
    '#E9858B', '#DCD988', '#AEE984', '#DAF38A', '#F3E58A', '#E9D184', '#12E1FF',
    '#10E8C9', '#1EFF9F', '#10E84E', '#12FF13', '#FF314D', '#E82DA4', '#F13EFF',
    '#A72DE8', '#7F31FF', '#FFD032', '#FFAB3F', '#E8602E', '#FF3243', '#E8040D'
  ];

  let obj = {};

  obj.getRandomColor = function() {
    const randomNumber = Math.floor(Math.random() * myColors.length);

    return myColors[randomNumber];
  };

  obj.changeBackgroundColor = function() {
    const randomColor = obj.getRandomColor();

    $('body').css('background-color', randomColor);
  };

  return obj;
}());

function setUpNotifications() {
  const myUrl = createGiphyUrl();

  $.ajax({
    url: myUrl,
    method: 'GET'
  }).done(function(data) {
    displayNotifications(data['URL']);
    displayStatusPage(data['URL']);
  });
}

function createGiphyUrl() {
  const giphyKeyword = $('#giphy-search').val() || 'random';

  return '/giphy?keyword=' + giphyKeyword;
}

function displayNotifications(url) {
  for(let i = 0; i < 3; i++) {
    createNotification(url);
  }
}

function displayStatusPage(url) {
  var $giphyImage = $('iframe');
  $giphyImage.attr('src', url);

  $('.modal.status').fadeIn(400);
}

var allNotifications = [];

function createNotification(url) {
  if(!Notification) return;

  requestNotificationPermission();

  var notification = new Notification('Timer Finished', {
    icon: url,
    body: 'Take a break!'
  });

  allNotifications.push(notification);

  notification.onclick = function() {
    window.open(url);
    closeAllNotifications();
  }

  notification.onclose = function() {
    closeAllNotifications();
  }
}

function closeAllNotifications() {
  for(let i = 0; i < allNotifications.length; i++) {
    allNotifications[i].close();
  }
}

function setUpKeyboardShortcuts() {
  $(window).keypress(function(e) {

    if(!isModalOpen()) {
      e.preventDefault();

      setUpSettingsShortcut(e.keyCode);
      setUpPlayShortcut(e.keyCode);
      setUpResetShortcut(e.keyCode);
      setUpWorkShortcut(e.keyCode);
      setUpBreakShortcut(e.keyCode);
    }
  });

  $(window).keyup(function(e) {
    setUpStatusModalCloseShortcut(e.keyCode);
  });
}

function setUpPlayShortcut(keyCode) {
  const spacebarPressed = keyCode === 32;

  if(spacebarPressed) {
    $('.play-pause').click();
  }
}

function setUpResetShortcut(keyCode) {
  const resetKeyPressed = keyCode === 82 || keyCode === 114;

  if(resetKeyPressed) {
    $('.reset').click();
  }
}

function setUpWorkShortcut(keyCode) {
  const workKeyPressed = keyCode === 87 || keyCode === 119;

  if(workKeyPressed) {
    $('#work').click();
  }
}

function setUpBreakShortcut(keyCode) {
  const breakKeyPressed = keyCode === 66 || keyCode === 98;

  if(breakKeyPressed) {
    $('#break').click();
  }
}

function isModalOpen() {
  return $('.modal.settings').css('display') !== 'none';
}

function setUpSettingsShortcut(keyCode) {
  const settingsKeyPressed = keyCode === 83 || keyCode === 115;

  if(settingsKeyPressed) {
    $('#openModal').click();
  }
};

function setUpStatusModalCloseShortcut(keyCode) {
  const escapeKeyPressed = keyCode === 27;

  if(escapeKeyPressed) {
    $('iframe').attr('src', '');
    $('.modal.status').fadeOut(400);
  }
}
