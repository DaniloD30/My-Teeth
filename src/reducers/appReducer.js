import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  loading: {
    
    loginCreateLoading: false,
    loginLoading: false,

    getClinicsLoading: false,
    getStatusLoading: false,
    deleteClinicLoading: false,
    addClinicLoading: false,
    addClinicTypeLoading: false,
    editClinicTypeLoading: false,
    editClinicLoading: false,
    getClinicsTypeLoading: false,
    dataUserLoading: false,
    dataAllUserLoading: false,
    deleteClinicTypeLoading: false,
    getProceduresLoading: false,
    deleteProcedureLoading: false,
    addProcedureLoading: false,
    editProcedureLoading: false,
    dataClinicLoading: false,
    editUserLoading: false,
    deleteAppointmentTypeLoading: false,
    dataAppointmentsLoading: false,
    appointmentTypeLoading: false,
    editAppointmentTypeLoading: false,
    addAppointmentTypeLoading: false,
    getAllAppointmentsDentists: false,
    getAppointmentPacientLoading: false,
    addAppointmentLoading: false,
    editAppointmentLoading: false,
    DeleteAppointmentLoading: false,
    editAddressLoading: false,
    addAdressLoading: false,
    getAdressLoading: false,
    getStatesLoading: false,
    getCitiesLoading: false
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
