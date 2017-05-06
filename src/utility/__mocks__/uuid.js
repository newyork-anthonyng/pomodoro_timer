const uuid = (function() {
  let counter = 0;

  return function() {
    return counter++;
  };
})();

export default uuid;
