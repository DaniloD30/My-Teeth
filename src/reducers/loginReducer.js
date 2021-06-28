import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  accountCreateSuccess: false,
  auth: false,
  profileId: 0,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.CREATE_ACCOUNT:
      return {
        ...state,
        accountCreateSuccess: true,

        // clinicaAdd: action?.payload?.data,
      };
    case Constants.CREATE_LOGIN:
      return {
        ...state,
        auth: action?.payload.auth,
        // clinicaAdd: action?.payload?.data,
      };
    case Constants.SAVE_PROFILE_ID:
      return {
        ...state,
        profileId: action?.payload,
        // clinicaAdd: action?.payload?.data,
      };
    case Constants.LOGOUT:
      return {
        INITIAL_STATE,
        auth: false,
      };
    default:
      return state;
  }
}
