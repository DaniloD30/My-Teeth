import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  appointmentsStatus: [],
};

export default function appointmentStatusReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_STATUS:
      return {
        ...state,
        appointmentsStatus: action?.payload.rows,
      };
    default:
      return state;
  }
}
