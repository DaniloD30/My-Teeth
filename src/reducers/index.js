import { combineReducers } from "redux";

// Application Reducers

import app from "~/reducers/appReducer";
import login from "~/reducers/loginReducer";
import clinic from "~/reducers/clinicaReducer";
import clinicType from "~/reducers/clinicTypeReducer";
import user from "~/reducers/userReducer";
import procedure from "~/reducers/procedureReducer";
import appointment from "~/reducers/appointmentReducer";
import appointmentType from "~/reducers/appointmentTypeReducer";
import appointmentStatus from "~/reducers/appointmentStatusReducer";

export default combineReducers({
  app,
  login,
  clinic,
  clinicType,
  user,
  appointment,
  appointmentType,
  appointmentStatus,
  procedure,
});
