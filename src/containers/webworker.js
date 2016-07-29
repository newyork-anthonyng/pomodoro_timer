let currentTime = 0;
let timer = null;
const SECOND = 1000;

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

	if(currentTime <= 0) {
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

self.addEventListener('message', (e) => {
	switch(e.data.action) {
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
