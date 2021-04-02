import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  loading: {
    
    loginCreateLoading: false,
    loginLoading: false,

    getClinicsLoading: false,
    deleteClinicLoading: false,
    addClinicLoading: false,
    editClinicLoading: false,

    dataUserLoading: false,
    dataAllUserLoading: false,

    getProceduresLoading: false,
    deleteProcedureLoading: false,
    addProcedureLoading: false,
    editProcedureLoading: false,

    editUserLoading: false,
    dataAppointmentsLoading: false,
    appointmentTypeLoading: false,
  },
};

function appReducer(state = INITIAL_STATE, action = null) {
  switch (action.type) {
    case Constants.UPDATE_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.loading,
        },
      };

    default:
      return state;
  }
}

export default appReducer;
