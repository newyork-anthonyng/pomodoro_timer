import {
    dispatchTogglePlayAction,
    dispatchPauseAction,
    dispatchResetAction,
    dispatchSetTimeAction,
    dispatchSetWorkIntervalAction,
    dispatchSetBreakIntervalAction
} from "../actions";

it("dispatchTogglePlayAction", () => {
    expect(dispatchTogglePlayAction()).toMatchSnapshot();
});

it("dispatchPauseAction", () => {
    expect(dispatchPauseAction()).toMatchSnapshot();
});

it("dispatchResetAction", () => {
    expect(dispatchResetAction()).toMatchSnapshot();
});

it("dispatchSetTimeAction", () => {
    expect(dispatchSetTimeAction(42)).toMatchSnapshot();
});

it("dispatchSetWorkIntervalAction", () => {
    expect(dispatchSetWorkIntervalAction()).toMatchSnapshot();
});

it("dispatchSetBreakIntervalAction", () => {
    expect(dispatchSetBreakIntervalAction()).toMatchSnapshot();
});