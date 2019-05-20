import getTimeText from "../getTimeText";

describe("getTimeText", () => {
  it("should return correct time", () => {
    const timeInSeconds = 30 * 60;
    expect(getTimeText(timeInSeconds)).toEqual(`30:00`);
  });

  it("should return seconds with padded 0's", () => {
    const timeInSeconds = 30 * 60 - 59;
    expect(getTimeText(timeInSeconds)).toEqual(`29:01`);
  });

  it("should handle NaN", () => {
    const invalidTime = "what?";
    expect(getTimeText(invalidTime)).toEqual(`0:00`);
  });
});
