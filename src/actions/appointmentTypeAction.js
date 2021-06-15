import Utils from "~/helpers/Utils";
import {
  addAppointmentTypeService,
  getAppointmentType,
  deleteAppointmentTypeService,
  editAppointmentTypeService,
} from "~/services/appointmentTypeService";
import Constants from "~/helpers/enums/Constants";

export const addAppointmentType = (
  params = "",
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  addAppointmentTypeService(params, token)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      if (error.response) {
        fnCallback(error.response.data.message);
      }
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const getAllAppointmentsType = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getAppointmentType(token)
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_ALL_APPOINTMENTS_TYPE,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        fnCallback(error.response.data.message);
      }
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const editAppointmentType = (
  data,
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  editAppointmentTypeService(data, token, id)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      if (error.response) {
        fnCallback(error.response.data.message);
      }
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const deleteAppointmentType = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteAppointmentTypeService(token, id)
    .then((response) => {
      if (response) {
        fnCallback();
      }
    })
    .catch((error) => {
      if (error.response) {
        fnCallback(error.response.data.message);
      }
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

const appointmentTypeAction = {
  getAllAppointmentsType,
  addAppointmentType,
  editAppointmentType,
  deleteAppointmentType,
};
export default appointmentTypeAction;
