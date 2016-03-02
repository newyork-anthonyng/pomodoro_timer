'use strict';

$(function() {
  console.log('app.js loaded');

  if(typeof(Worker) !== 'undefined') {
    let webWorker = new Worker('web_worker.js');

    webWorker.onmessage = function(event) {
      $('.timer').text('time: ' + event.data);
    };
  } else {

  }
});
