global._events_ = {};

global.addEventListener = jest.fn((name, callback) => {
    global._events_[name] = callback;
});

global.postMessage = jest.fn();

beforeEach(() => {
    global._events = {};

    global.addEventListener.mockClear();
    global.postMessage.mockClear();
});