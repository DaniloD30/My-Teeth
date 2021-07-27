import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  appointments: [],
  appointmentsMyConsults: [],
  appointmentsByIdDentist: [],
  appointmentByIdPacient: [],
  appointmentByClinic: [],
};

export default function appointmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: action?.payload.rows,
      };
    case Constants.GET_ALL_APPOINTMENTS_MYCONSULTS:
      return {
        ...state,
        appointmentsMyConsults: action?.payload.rows,
      };
    case Constants.GET_ALL_APPOINTMENTS_DENTIST:
      return {
        ...state,
        appointmentsByIdDentist: action?.payload.rows,
      };
    case Constants.GET_ALL_APPOINTMENTS_PACIENT:
      return {
        ...state,
        appointmentByIdPacient: action?.payload.rows,
      };
    case Constants.GET_ALL_APPOINTMENTS_CLINIC:
      return {
        ...state,
        appointmentByClinic: action?.payload.rows,
      };
    default:
      return state;
  }
}
