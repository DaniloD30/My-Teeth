import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  clinicsType: [],
  clinicUser: [],
};

export default function clinicTypeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_ALL_CLINICS_TYPES:
      return {
        ...state,
        clinicsType: action?.payload.rows,
      };
    case Constants.GET_CLINIC:
      return {
        ...state,
        clinicUser: action?.payload,
      };
    default:
      return state;
  }
}
