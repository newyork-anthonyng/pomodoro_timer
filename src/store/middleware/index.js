import { webWorkerMiddleware } from "./webworker";
import { renderMiddleware } from "./render";
import { loggerMiddleware } from "./logger";

const middlewares = [webWorkerMiddleware, renderMiddleware, loggerMiddleware];

export default middlewares;
