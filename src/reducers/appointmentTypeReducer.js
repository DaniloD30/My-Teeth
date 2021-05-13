import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
    appointmentsType: []
};

export default function appointmentTypeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_APPOINTMENTS_TYPE:
      return {
        ...state,
        appointmentsType: action?.payload.rows
      };
    default:
      return state;
  }
}
