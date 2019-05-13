const loggerMiddleware = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);

  next(action);

  console.log("next state", store.getState());
  console.groupEnd(action.type);
};

export default loggerMiddleware;
