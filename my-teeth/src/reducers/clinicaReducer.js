import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  clinics: [],
  editClinic: [{}],
  flagEdit: false
};

export default function clinicaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case Constants.CLINICA_ADD:
    //   return {
    //     ...state,
    //     clinicaAdd: action?.payload?.data
    //   };
    case Constants.GET_ALL_CLINICS:
      return {
        ...state,
        clinics: action?.payload.rows
      };
    // case Constants.EDIT_CLINIC:
    //   return {
    //     ...state,
    //     editClinic: action?.payload
    //   };
      // case Constants.FLAG_EDIT:
      //   return {
      //     ...state,
      //     flagEdit: action?.payload
      //   };
    default:
      return state;
  }
}
