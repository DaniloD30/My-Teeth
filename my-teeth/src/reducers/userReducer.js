import Constants from "~/helpers/enums/Constants";
const INITIAL_STATE = {
  userDataProfile: [],
  userPhoto: "",
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_DADOS_PROFILE:
      return {
        ...state,
        userDataProfile: action?.payload?.person
      };
    case Constants.SAVE_PHOTO_USER:
      return{
        ...state,
        userPhoto: action?.payload
      };
    default:
      return state;
  }
}
