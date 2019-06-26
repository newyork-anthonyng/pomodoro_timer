import SHORTCUT from "../shortcut";

describe("isPlayPause", () => {
    let event;

    beforeEach(() => {
        event = {
            metaKey: true,
            key: "p"
        };
    });

    it("should return true when 'p' and 'meta' key are pressed", () => {
        const result = SHORTCUT.isPlayPause(event);

        expect(result).toEqual(true);
    });

    it("should return false when 'meta' key is not pressed", () => {
        event.metaKey = false;
        const result = SHORTCUT.isPlayPause(event);

        expect(result).toEqual(false);
    });

    it("should return false when non-'p' character is pressed", () => {
        event.key = "z";
        const result = SHORTCUT.isPlayPause(event);

        expect(result).toEqual(false);
    });
});

describe("isReset", () => {
    let event;

    beforeEach(() => {
        event = {
            metaKey: true,
            key: "r"
        };
    });

    it("should return true when 'r' and 'meta' key are pressed", () => {
        const result = SHORTCUT.isReset(event);

        expect(result).toEqual(true);
    });

    it("should return false when 'meta' key is not pressed", () => {
        event.metaKey = false;
        const result = SHORTCUT.isReset(event);

        expect(result).toEqual(false);
    });

    it("should return false when non-'r' character is pressed", () => {
        event.key = "z";
        const result = SHORTCUT.isReset(event);

        expect(result).toEqual(false);
    });
});

describe("isToggleInterval", () => {
    let event;

    beforeEach(() => {
        event = {
            metaKey: true,
            key: "b"
        };
    });

    it("should return true when 'b' and 'meta' key are pressed", () => {
        const result = SHORTCUT.isToggleInterval(event);

        expect(result).toEqual(true);
    });

    it("should return false when 'meta' key is not pressed", () => {
        event.metaKey = false;
        const result = SHORTCUT.isToggleInterval(event);

        expect(result).toEqual(false);
    });

    it("should return false when non-'b' character is pressed", () => {
        event.key = "z";
        const result = SHORTCUT.isToggleInterval(event);

        expect(result).toEqual(false);
    });
});