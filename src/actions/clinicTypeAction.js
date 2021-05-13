import Utils from "~/helpers/Utils";
import {
  addClinicTypeService,
  getClinicType,
  deleteClinicTypeService,
  editClinicTypeService,
} from "~/services/clinicTypeService"; 
import Constants from "~/helpers/enums/Constants";

export const addClinicType = (
  params = "",
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  addClinicTypeService(params, token)
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

export const getAllClinicsType = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getClinicType(token)
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_ALL_CLINICS_TYPES,
          payload: response?.data,
        });
      }
    })
    .catch(() => {})
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const editClinicType = (
  data,
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  editClinicTypeService(data, token, id)
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

export const deleteClinicType = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteClinicTypeService(token, id)
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

const clinicTypeAction = {
  getAllClinicsType,
  addClinicType,
  editClinicType,
  deleteClinicType,
};
export default clinicTypeAction;
