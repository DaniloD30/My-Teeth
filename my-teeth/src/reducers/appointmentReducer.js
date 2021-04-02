import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
    appointments: []
};

export default function appointmentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_APPOINTMENTS:
      return {
        ...state,
        appointments: action?.payload.rows
      };
    default:
      return state;
  }
}
