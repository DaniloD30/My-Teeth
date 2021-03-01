import Constants from "~/helpers/enums/Constants";

const INITIAL_STATE = {
  loading: {
    getUsersLoading: false,
    loginCreateLoading: false,
    loginLoading: false,
    getClinicsLoading: false,
    deleteClinicLoading: false,
    addClinicLoading: false,
    editClinicLoading: false
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
