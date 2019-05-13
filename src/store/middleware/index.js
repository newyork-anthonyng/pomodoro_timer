import webWorkerMiddleware from "./webworker";
import renderMiddleware from "./render";
import loggerMiddleware from "./logger";
import notificationMiddleware from "./notification";

const middlewares = [notificationMiddleware, webWorkerMiddleware, renderMiddleware, loggerMiddleware];

export default middlewares;
