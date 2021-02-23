import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  accountCreateSuccess: false,
  auth: false,
  type: ''
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
        auth: action?.payload.auth,
        type: action?.payload.profileid
        // clinicaAdd: action?.payload?.data,
      };
    default:
      return state;
  }
}
