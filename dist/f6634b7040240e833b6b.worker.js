/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var currentTime = 0;
	var timer = null;
	//const SECOND = 1000;
	var SECOND = 500;

	function startTimer(time) {
		currentTime = time;

		timer = setInterval(tick, SECOND);
	}

	function tick() {
		currentTime--;

		self.postMessage({
			action: 'TICK',
			time: currentTime
		});

		if (currentTime <= 0) {
			stopTimer();
			self.postMessage({
				action: 'COMPLETE'
			});
		}
	}

	function stopTimer() {
		clearInterval(timer);
		timer = null;
	}

	self.addEventListener('message', function (e) {
		switch (e.data.action) {
			case 'START':
				startTimer(e.data.time);
				break;
			case 'STOP':
				stopTimer();
				break;
			default:
				return false;
		};
	});

/***/ }
/******/ ]);