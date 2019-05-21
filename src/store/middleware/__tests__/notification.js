import "../__mocks__/notificationEnvironment";
import notificationMiddleware from "../notification";

describe("notificationMiddleware", () => {
    let store;
    let action;
    let state;

    beforeEach(() => {
        state = {
            isPlaying: true,
            time: 42
        };
        store = {
            getState: () => state
        };
        action = { type: "FOO_BAR" };
    });

    it("should call the next function with the action", () => {
        const next = jest.fn();

        notificationMiddleware(store)(next)(action);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0]).toEqual(action);
    });

    it("should create notification if timer stopped and time is expired", () => {
        const next = () => {
            state.isPlaying = false;
            state.time = 0;
        };

        expect(window.Notification).toHaveBeenCalledTimes(0);

        notificationMiddleware(store)(next)(action);

        expect(window.Notification).toHaveBeenCalledTimes(1);
        expect(window.Notification.mock.calls[0]).toMatchSnapshot();
    });
});