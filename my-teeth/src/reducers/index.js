import { combineReducers } from "redux";

// Application Reducers

import app from "~/reducers/appReducer";
import login from "~/reducers/loginReducer";
import clinic from "~/reducers/clinicaReducer";
export default combineReducers({
  app,
  login,
  clinic
}); 
