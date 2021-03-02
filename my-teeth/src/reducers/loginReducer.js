import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  accountCreateSuccess: false,
  auth: false
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.CREATE_ACCOUNT:
      return {
        ...state,
        accountCreateSuccess: true

        // clinicaAdd: action?.payload?.data,
      };
    case Constants.CREATE_LOGIN:
      return {
        ...state,
        auth: action?.payload.auth
        // clinicaAdd: action?.payload?.data,
      };
    case Constants.LOGOUT:
      return {
        ...state,
        auth: false
      }
    default:
      return state;
  }
}
