import { combineReducers } from "redux";

// Application Reducers

import app from "~/reducers/appReducer";
import login from "~/reducers/loginReducer";
import clinic from "~/reducers/clinicaReducer";
import user from "~/reducers/userReducer";
export default combineReducers({
  app,
  login,
  clinic,
  user
}); 
