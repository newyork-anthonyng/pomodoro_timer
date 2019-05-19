const createStore = (reducer, middleware) => {
  const store = {};
  store.state = undefined;

  store.getState = () => {
    return store.state || {};
  };

  store.dispatch = (action) => {
    store.state = reducer(store.state, action);
  };

  // https://redux.js.org/advanced/middleware
  function applyMiddleware(middlewares) {
    middlewares.forEach(middleware => {
      store.dispatch = middleware(store)(store.dispatch);
    });
  };
  if (middleware) {
    applyMiddleware(middleware);
  }

  store.dispatch({ type: "INITIAL" });
  return store;
};

export default createStore;
