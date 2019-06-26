const SHORTCUT = {
    isPlayPause: e => {
        return e.metaKey && e.key === "p";
    },
    isReset: e => {
        return e.metaKey && e.key === "r";
    },
    isToggleInterval: e => {
        return e.metaKey && e.key === "b";

    }
};

export default SHORTCUT;