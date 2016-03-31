'use strict';

const should = chai.should();

describe('timerWebWorker', function() {

  it('timedCount');

  describe('setTimer()', function() {
    let pauseTimerStub, postMessageStub;

    before(function() {
      pauseTimerStub = sinon.stub(timerWebWorker, 'pauseTimer');
      postMessageStub = sinon.stub(window, 'postMessage');

      timerWebWorker.setTimer(15);
    });

    after(function() {
      timerWebWorker.pauseTimer.restore();
      window.postMessage.restore();
    });

    it('should pause timer', function() {
      pauseTimerStub.calledOnce.should.be.true;
    });

    it('should pass "set" message', function() {
      let testData = postMessageStub.args[0][0];

      testData.action.should.equal('set');
      testData.time.should.equal(15);
    });
  });

  describe('playTimer()', function() {
    let timedCountStub, postMessageStub;

    before(function() {
      timedCountStub = sinon.stub(timerWebWorker, 'timedCount');
      postMessageStub = sinon.stub(window, 'postMessage');

      timerWebWorker.setTimer(16);
      timerWebWorker.playTimer();
    });

    after(function() {
      timerWebWorker.timedCount.restore();
      window.postMessage.restore();
    });

    it('should play timedCount', function() {
      timedCountStub.calledOnce.should.be.true;
    });

    it('should pass "play" message', function() {
      let testData = postMessageStub.args[2][0];

      testData.action.should.equal('play');
      testData.time.should.equal(16);
    });
  });

  describe('pauseTimer()', function() {
    let timedCountStub, postMessageStub;

    before(function() {
      timedCountStub = sinon.stub(timerWebWorker, 'timedCount');
      postMessageStub = sinon.stub(window, 'postMessage');

      timerWebWorker.pauseTimer();
    });

    after(function() {
      timerWebWorker.timedCount.restore();
      window.postMessage.restore();
    });

    it('should play timedCount', function() {
      timedCountStub.calledOnce.should.be.false;
    });

    it('should pass "pause" message', function() {
      let testData = postMessageStub.args[0][0];

      testData.action.should.equal('pause');
      testData.time.should.equal(16);
    });
  });

});
