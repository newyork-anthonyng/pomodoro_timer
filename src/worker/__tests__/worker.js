import "../__mocks__/workerEnvironment";
import "../worker";

jest.useFakeTimers();

describe("event listeners", () => {
  it("should start timer when 'START' message is received", () => {
    const time = 42;
    self._events_.message({
      data: {
        action: "START",
        time: time
      }
    });

    jest.advanceTimersByTime(1000);

    expect(global.postMessage).toHaveBeenCalledTimes(1);
    expect(global.postMessage.mock.calls[0][0]).toEqual({
      action: "TICK",
      time: time - 1
    });
    global.postMessage.mockClear();

    jest.advanceTimersByTime(1000);
    expect(global.postMessage).toHaveBeenCalledTimes(1);
    expect(global.postMessage.mock.calls[0][0]).toEqual({
      action: "TICK",
      time: time - 2
    });
  });

  it("should stop timer when 'STOP' message is received", () => {
    self._events_.message({
      data: {
        action: "STOP"
      }
    });

    jest.advanceTimersByTime(1000);
    expect(self.postMessage).not.toHaveBeenCalled();
  });

  it("should send 'COMPLETE' message when timer is finished", () => {
    const time = 2;
    self._events_.message({
      data: {
        action: "START",
        time: time
      }
    });

    jest.advanceTimersByTime(1000);
    expect(global.postMessage).toHaveBeenCalledTimes(1);
    expect(global.postMessage.mock.calls[0][0]).toEqual({
      action: "TICK",
      time: time - 1
    });
    global.postMessage.mockClear();

    jest.advanceTimersByTime(1000);
    expect(global.postMessage).toHaveBeenCalledTimes(2);
    expect(global.postMessage.mock.calls[0][0]).toEqual({
      action: "TICK",
      time: 0
    });
    expect(global.postMessage.mock.calls[1][0]).toEqual({
      action: "COMPLETE"
    });
  });
});

