import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  clinics: [],
  clinicUser: []
};

export default function clinicaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_CLINICS:
      return {
        ...state,
        clinics: action?.payload.rows,
      };
      case Constants.GET_CLINIC:
        return {
          ...state,
          clinicUser: action?.payload.rows,
        };
    default:
      return state;
  }
}
