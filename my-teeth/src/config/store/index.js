import { createStore } from "redux";
import middlewares from "./middlewares";
import reducers from '../../reducers'
export default createStore(reducers, middlewares);

