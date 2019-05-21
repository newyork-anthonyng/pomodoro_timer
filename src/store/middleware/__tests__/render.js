import renderMiddleware from "../render";
import { renderDocumentTitle } from "../../../renderElements";

var mockCurriedRenderPlayButton;
var mockCurriedRenderTimeElement;
jest.mock("../../../renderElements", () => {
    return {
        renderPlayButton: jest.fn(() => {
            mockCurriedRenderPlayButton = jest.fn();
            return mockCurriedRenderPlayButton;
        }),
        renderTimeElement: jest.fn(() => {
            mockCurriedRenderTimeElement = jest.fn();
            return mockCurriedRenderTimeElement;

        }),
        renderDocumentTitle: jest.fn()
    };
});

describe("renderMiddleware", () => {
    let state;
    let store;
    let action;

    beforeEach(() => {
        state = {
            isPlaying: false,
            time: 42
        };

        store = {
            getState: () => state
        };

        action = { type: "FOO_BAR" };
    });

    it("should call the next function with the action", () => {
        const next = jest.fn();

        renderMiddleware(store)(next)(action);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next.mock.calls[0][0]).toEqual(action);
    });

    it("should call renderPlayButton if the play state has changed", () => {
        const next = () => {
            state.isPlaying = true;
        };

        expect(mockCurriedRenderPlayButton).toHaveBeenCalledTimes(0);

        renderMiddleware(store)(next)(action);

        expect(mockCurriedRenderPlayButton).toHaveBeenCalledTimes(1);
        expect(mockCurriedRenderPlayButton.mock.calls[0][0]).toEqual(true);
    });

    it("should call renderTimeElement and renderDocumentTitle when the time has changed", () => {
        const next = () => {
            state.time = 100;
        };

        expect(mockCurriedRenderTimeElement).toHaveBeenCalledTimes(0);
        expect(renderDocumentTitle).toHaveBeenCalledTimes(0);

        renderMiddleware(store)(next)(action);

        expect(mockCurriedRenderTimeElement).toHaveBeenCalledTimes(1);
        expect(mockCurriedRenderTimeElement.mock.calls[0][0]).toEqual(100);
        expect(renderDocumentTitle.mock.calls[0][0]).toEqual(100);
    });
});