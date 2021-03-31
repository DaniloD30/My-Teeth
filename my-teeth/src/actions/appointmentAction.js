import Utils from "~/helpers/Utils";
import {
  addAppointmentService,
  getAppointment,
  deleteAppointmentService,
  editAppointmentService,
} from "~/services/appointmentService";
import Constants from "~/helpers/enums/Constants";

export const addAppointment = (
  params = "",
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  addAppointmentService(params, token)
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

export const getAllAppointments = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getAppointment(token)
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_ALL_PROCEDURES,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const editAppointment = (
  data,
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  editAppointmentService(data, token, id)
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

export const deleteAppointment = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteAppointmentService(token, id)
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

const appointmentAction = {
  getAllAppointments,
  addAppointment,
  editAppointment,
  deleteAppointment,
};
export default appointmentAction;
