import { combineReducers } from "redux";

// Application Reducers

import app from "~/reducers/appReducer";
import login from "~/reducers/loginReducer";
export default combineReducers({
  app,
  login
});
