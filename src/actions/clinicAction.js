import Utils from "~/helpers/Utils";
import {
  getClinic,
  deleteClinicService,
  getClinicService,
  addClinicService,
  editClinicService,
} from "~/services/clinicaService";
import Constants from "~/helpers/enums/Constants";

export const addClinic = (
  params = "",
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  addClinicService(params, token)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const getAllClinics = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getClinic(token)
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_ALL_CLINICS,
          payload: response?.data,
        });
      }
    })
    .catch(() => {})
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const getClinicUser = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getClinicService(token, localStorage.getItem("clinic_id"))
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_CLINIC,
          payload: response?.data,
        });
      }
    })
    .catch(() => {})
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const editClinic = (
  data,
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  editClinicService(data, token, id)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const deleteClinic = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteClinicService(token, id)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

const clinicAction = {
  getAllClinics,
  getClinicUser,
  addClinic,
  editClinic,
  deleteClinic,
};
export default clinicAction;
