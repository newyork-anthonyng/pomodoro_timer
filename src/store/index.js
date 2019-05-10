import middlewares from "./middleware/index";
import createStore from "./createStore";
import reducerFunction from "./reducer";

const store = createStore(reducerFunction, middlewares);
export default store;

