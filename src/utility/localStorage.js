const Storage = (function() {
  const KEY = 'pomodoro_timer';

  const get = () => {
    try {
      return JSON.parse(window.localStorage.getItem(KEY));
    } catch (e) {
      return [];
    }
  };

  const set = (favorites) => {
    window.localStorage.setItem(KEY, JSON.stringify(favorites));
  };

  return {
    get,
    set,
  };
})();

export default Storage;
