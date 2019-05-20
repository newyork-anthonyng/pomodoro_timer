import {
  renderPlayButton,
  renderTimeElement,
  renderDocumentTitle
} from "../renderElements";

describe("renderPlayButton", () => {
  let $button;
  let curriedFunction;

  beforeEach(() => {
    $button = document.createElement("button");
    curriedFunction = renderPlayButton($button);
  });

  it("should return a curried function", () => {
    expect(typeof curriedFunction).toEqual("function");
  });

  it("should update button text to 'Pause' when play === true", () => {
    curriedFunction(true);

    expect($button.innerText).toEqual("Pause");
  });

  it("should update button text to 'Play' when play === false", () => {
    curriedFunction(false);

    expect($button.innerText).toEqual("Play");
  });
});

describe("renderTimeElement", () => {
  let $text;
  let curriedFunction;

  beforeEach(() => {
    $text = document.createElement("h1");
    curriedFunction = renderTimeElement($text);
  });

  it("should return a curried function", () => {
    expect(typeof curriedFunction).toEqual("function");
  });

  it("should render correct text", () => {
    const timeInSeconds = 30 * 60;
    curriedFunction(timeInSeconds);

    expect($text.innerText).toEqual("30:00");
  });
});

describe("renderDocumentTitle", () => {
  it("should update document.title with correct text", () => {
    const timeInSeconds = 30 * 60;
    renderDocumentTitle(timeInSeconds);

    expect(document.title).toEqual("30:00");
  });
});
