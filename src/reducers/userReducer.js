import Constants from "~/helpers/enums/Constants";
const INITIAL_STATE = {
  userDataProfile: [],
  // "Administrador", "Dentista", "Atendente", "Cliente"
  dentista: [],
  admnistrador: [],
  atendente: [],
  cliente: [],
  userPhoto: "",
  address: []
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Constants.GET_DADOS_PROFILE:
      return {
        ...state,
        userDataProfile: action?.payload?.person,
      };
    case Constants.GET_ALL_DADOS_PROFILE:
      return {
        ...state,
        admnistrador: action?.payload?.admnistrador,
        atendente: action?.payload?.atendente,
        cliente: action?.payload?.cliente,
        dentista: action?.payload?.dentista,
      };
    case Constants.SAVE_PHOTO_USER:
      return {
        ...state,
        userPhoto: action?.payload,
      };
    case Constants.GET_ADDRESS:
      return {
        ...state,
        address: action?.payload?.rows[0],
      };
    default:
      return state;
  }
}
