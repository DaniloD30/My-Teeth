import Constants from "~/helpers/enums/Constants";
const INITIAL_STATE = {
  userDataProfile: [],
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_DADOS_PROFILE:
      return {
        ...state,
        userDataProfile: action?.payload?.person
      };
    default:
      return state;
  }
}
