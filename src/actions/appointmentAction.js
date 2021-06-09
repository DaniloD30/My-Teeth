import Utils from "~/helpers/Utils";
import {
  addAppointmentService,
  getAppointment,
  deleteAppointmentService,
  editAppointmentService,
  getAppointmentTypeByIdDentist,
  getAppointmentTypeByIdPacient,
} from "~/services/appointmentService";
import Constants from "~/helpers/enums/Constants";

export const addAppointment =
  (params = "", token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
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

export const getAllAppointments =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    // necessario passar o ID da clinic aqui. Cada clinica responsavel apenas pelo dados
    // da sua clinica.
    getAppointment(token)
      .then((response) => {
        if (response) {
          response.data.rows.forEach((item) => {
            let d = new Date(item?.StartTime);
            let e = new Date(item?.EndTime);
            let horaStart =
              d.getHours() < 10 ? `${d.getHours()}0` : d.getHours();
            let minStart =
              d.getMinutes() < 10 ? `${d.getMinutes()}0` : d.getMinutes();
            let horaEnd = e.getHours() < 10 ? `${e.getHours()}0` : e.getHours();
            let minEnd =
              e.getMinutes() < 10 ? `${e.getMinutes()}0` : e.getMinutes();

            item.date = `${horaStart}:${minStart} - ${horaEnd}:${minEnd}`;
          });

          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS,
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

export const getAllAppointmentsDentists =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    getAppointmentTypeByIdDentist(token, id)
      .then((response) => {
        if (response) {
          response.data.rows.forEach((item) => {
            let data = new Date(item?.StartTime);
            // item.pacient = item
            item.day = `${data?.getDate()}/${
              data?.getMonth() + 1
            }/${data?.getFullYear()}`;
          });
          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS_DENTIST,
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

export const getAllAppointmentsPacients =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    getAppointmentTypeByIdPacient(token, id)
      .then((response) => {
        if (response) {
          response.data.rows.forEach((item) => {
            let data = new Date(item?.StartTime);
            item.clinicName = item?.clinic?.company_name;
            item.day = `${data?.getDate()}/${
              data?.getMonth() + 1
            }/${data?.getFullYear()}`;
          });

          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS_PACIENT,
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

export const editAppointment =
  (data, token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
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

export const deleteAppointment =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
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
  getAllAppointmentsDentists,
  getAllAppointmentsPacients,
  addAppointment,
  editAppointment,
  deleteAppointment,
};
export default appointmentAction;
