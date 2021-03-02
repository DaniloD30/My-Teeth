import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  procedures: []
};

export default function clinicaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_PROCEDURES:
      return {
        ...state,
        procedures: action?.payload.rows
      };
    default:
      return state;
  }
}
