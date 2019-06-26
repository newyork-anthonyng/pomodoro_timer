import webworkerMiddleware from "../webworker";
import {
  RESET_ACTION,
  TOGGLE_ACTION,
  SET_WORK_INTERVAL_ACTION,
  SET_BREAK_INTERVAL_ACTION,
  TOGGLE_WORK_BREAK_INTERVAL_ACTION
} from "../../actions";

var mockTimerWorker;
jest.mock("../../../worker/index", () => {
    mockTimerWorker = { postMessage: jest.fn() };
    return mockTimerWorker;
});

describe("webworkerMiddleware", () => {
    let state;
    let store;
    let next;
    let action;

    beforeEach(() => {
        state = {
            isPlaying: true,
            time: 42
        };

        store = {
            getState: () => state
        };

        next = jest.fn(() => {
            state.isPlaying = !state.isPlaying;
        });

        action = { type: "FOO_BAR" };

        mockTimerWorker.postMessage.mockClear();
    });

    it("should call the next function with the action", () => {
        webworkerMiddleware(store)(next)(action);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0]).toEqual(action);
    });

    it("should not post message if play state did not change", () => {
        next = () => {};
        webworkerMiddleware(store)(next)(action);

        expect(mockTimerWorker.postMessage).not.toHaveBeenCalled();
    });

    describe("RESET_ACTION", () => {
        it("should POST STOP message", () => {
            action = {
                type: RESET_ACTION
            };
            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(1);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "STOP"
            });
        });
    });

    describe("TOGGLE_ACTION", () => {
        beforeEach(() => {
            action = {
                type: TOGGLE_ACTION
            };
        });

        it("should post START message if timer is now playing", () => {
            state.isPlaying = false;
            next = () => {
                state.isPlaying = true;
            };

            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(1);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "START",
                time: 42
            });
        });

        it("should post STOP message if timer is now paused", () => {
            state.isPlaying = true;
            next = () => {
                state.isPlaying = false;
            };

            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(1);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "STOP",
                time: 42
            });
        });
    });

    describe("SET_WORK_INTERVAL_ACTION", () => {
        it("should post START and STOP messages", () => {
            action = {
                type: SET_WORK_INTERVAL_ACTION
            };
            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(2);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "START",
                time: 42
            });
            expect(mockTimerWorker.postMessage.mock.calls[1][0]).toEqual({
                action: "STOP"
            });
        });
    });

    describe("SET_BREAK_INTERVAL_ACTION", () => {
        it("should post START and STOP messages", () => {
            action = {
                type: SET_BREAK_INTERVAL_ACTION
            };
            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(2);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "START",
                time: 42
            });
            expect(mockTimerWorker.postMessage.mock.calls[1][0]).toEqual({
                action: "STOP"
            });
        });
    });

    describe("TOGGLE_WORK_BREAK_INTERVAL_ACTION", () => {
        it("should post START and STOP messages", () => {
            action = {
                type: TOGGLE_WORK_BREAK_INTERVAL_ACTION
            };
            webworkerMiddleware(store)(next)(action);

            expect(mockTimerWorker.postMessage).toHaveBeenCalledTimes(2);
            expect(mockTimerWorker.postMessage.mock.calls[0][0]).toEqual({
                action: "START",
                time: 42
            });
            expect(mockTimerWorker.postMessage.mock.calls[1][0]).toEqual({
                action: "STOP"
            });
        });
    });
});