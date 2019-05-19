import reducer, { initialState } from "../reducer";
import {
  PAUSE_ACTION,
  TOGGLE_ACTION,
  RESET_ACTION,
  SET_TIME_ACTION,
  SET_WORK_INTERVAL_ACTION,
  SET_BREAK_INTERVAL_ACTION
} from "../actions";

it("should return initial state by default", () => {
  expect(reducer()).toMatchSnapshot();
});

describe("PAUSE_ACTION", () => {
  it("should return correct state", () => {
    const state = Object.assign({}, initialState, { isPlaying: true });

    expect(reducer(state, { type: PAUSE_ACTION })).toMatchSnapshot();
  });
});

describe("TOGGLE_ACTION", () => {
  let state;

  beforeEach(() => {
    state = Object.assign({}, initialState);
    state.time = 42;
  });

  it("should return correct state when timer was previously playing", () => {
    state.isPlaying = true;

    expect(reducer(state, { type: TOGGLE_ACTION })).toMatchSnapshot();
  });

  it("should return correct state when timer was previously paused", () => {
    state.isPlaying = false;

    expect(reducer(state, { type: TOGGLE_ACTION })).toMatchSnapshot();
  });

  describe("when timer was complete and timer was previously paused", () => {
    beforeEach(() => {
      state.isPlaying = false;
      state.time = 0;
    });

    it("should return correct time when in 'work' mode", () => {
      state.mode = "work";
      expect(reducer(state, { type: TOGGLE_ACTION })).toMatchSnapshot();
    });

    it("should return correct time when in 'break' mode", () => {
      state.mode = "break";
      expect(reducer(state, { type: TOGGLE_ACTION })).toMatchSnapshot();
    });
  });
});

describe("RESET_ACTION", () => {
  let state;

  beforeEach(() => {
    state = Object.assign({}, initialState);
  });

  it("should return correct state in 'work' mode", () => {
    state.mode = "work";

    expect(reducer(state, { type: RESET_ACTION })).toMatchSnapshot();
  });

  it("should return correct state in 'break' mode", () => {
    state.mode = "break";

    expect(reducer(state, { type: RESET_ACTION })).toMatchSnapshot();
  });
});

describe("SET_TIME_ACTION", () => {
  it("should return correct state", () => {
    expect(reducer(initialState, { type: SET_TIME_ACTION, data: 42 })).toMatchSnapshot();
  });
});

describe("SET_WORK_INTERVAL_ACTION", () => {
  it("should return correct state", () => {
    const state = Object.assign({}, initialState);
    state.mode = "break";
    state.isPlaying = true;
    state.time = 42;

    expect(reducer(initialState, { type: SET_WORK_INTERVAL_ACTION })).toMatchSnapshot();
  });
});

describe("SET_BREAK_INTERVAL_ACTION", () => {
  it("should return correct state", () => {
    const state = Object.assign({}, initialState);
    state.mode = "work";
    state.isPlaying = true;
    state.time = 42;

    expect(reducer(initialState, { type: SET_BREAK_INTERVAL_ACTION })).toMatchSnapshot();
  });
});
