import { combineReducers } from "redux";

// Application Reducers

import app from "~/reducers/appReducer";
import login from "~/reducers/loginReducer";
import clinic from "~/reducers/clinicaReducer";
import user from "~/reducers/userReducer";
import procedure from "~/reducers/procedureReducer";
import appointment from "~/reducers/appointmentReducer";
import appointmentType from "~/reducers/appointmentTypeReducer";

export default combineReducers({
  app,
  login,
  clinic,
  user,
  appointment,
  appointmentType,
  procedure
}); 
