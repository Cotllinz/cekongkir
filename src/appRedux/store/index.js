import { createStore, applyMiddleware } from "redux";
import reducers from "../../appRedux/reducer";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));
export { store };
