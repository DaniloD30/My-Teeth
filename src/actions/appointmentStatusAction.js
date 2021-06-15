import Utils from "~/helpers/Utils";
import {
  addAppointmentStatusService,
  getAppointmentStatus,
  deleteAppointmentStatusService,
  editAppointmentStatusService,
} from "~/services/appointmentStatus";
import Constants from "~/helpers/enums/Constants";

export const addAppointmentStatus =
  (params = "", token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    addAppointmentStatusService(params, token)
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

export const getAllAppointmentsStatus =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    getAppointmentStatus(token)
      .then((response) => {
        if (response) {
          dispatch({
            type: Constants.GET_ALL_STATUS,
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

export const editAppointmentStatus =
  (data, token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    editAppointmentStatusService(data, token, id)
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

export const deleteAppointmentStatus =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    deleteAppointmentStatusService(token, id)
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

const appointmentStatusAction = {
  getAllAppointmentsStatus,
  addAppointmentStatus,
  editAppointmentStatus,
  deleteAppointmentStatus,
};
export default appointmentStatusAction;
