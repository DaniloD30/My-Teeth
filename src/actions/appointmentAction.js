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
        if (error.response) {
          fnCallback(error.response.data.message);
        }
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
    getAppointment(token, localStorage.getItem("clinic_id"))
      .then((response) => {
        if (response) {
          response.data.appointments.rows.forEach((item) => {
            let d = new Date(item?.StartTime);
            let e = new Date(item?.EndTime);
            let horaStart =
              d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            let minStart =
              d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            let minEnd =
              e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

            item.date = `${horaStart}:${minStart} - ${horaEnd}:${minEnd}`;
          });

          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS,
            payload: response.data.appointments,
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

export const getAllAppointmentsDentists =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    getAppointmentTypeByIdDentist(token, id, localStorage.getItem("clinic_id"))
      .then((response) => {
        if (response) {
          response.data.appointments.rows.forEach((item) => {
            item.pacientName = item?.person?.name;

            // DATA
            let data = new Date(item?.StartTime);
            // item.pacient = item
            // a data tbm tem que verificar se é menor que 10
            let day =
              data?.getDate() < 10
                ? `0${data?.getDate()}`
                : `${data?.getDate()}`;
            let month =
              data?.getMonth() + 1 < 10
                ? `0${data?.getMonth() + 1}`
                : `${data?.getMonth() + 1}`;
            let year = `${data?.getFullYear()}`;
            item.day = `${day}/${month}/${year}`;

            // HORA
            let d = new Date(item?.StartTime);
            let e = new Date(item?.EndTime);
            let horaStart =
              d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            let minStart =
              d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            let minEnd =
              e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

            item.hour = `${horaStart}:${minStart} - ${horaEnd}:${minEnd}`;
          });
          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS_DENTIST,
            payload: response.data.appointments,
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

export const getAllAppointmentsPacients =
  (token, id, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    // NÃO SERÁ APENAS UMA CLÍNICA, O PACIENTE TERÁ UM ARRAY DE CLÍNICAS
    getAppointmentTypeByIdPacient(token, id, localStorage.getItem("clinic_id"))
      .then((response) => {
        if (response) {
          response.data.appointments.rows.forEach((item) => {
            // nameDentist
            response.data.nameDentist.rows.forEach((itemDentist) => {
              // itemDentist?.id  === item?.userdentist_id && item.dentistName = itemDentist?.person?.name
              if (itemDentist?.id === item?.userdentist_id) {
                item.dentistName = itemDentist?.person?.name;
              }
            });
            item.clinicName = item?.clinic?.company_name;
            let data = new Date(item?.StartTime);
            let day =
              data?.getDate() < 10
                ? `0${data?.getDate()}`
                : `${data?.getDate()}`;
            let month =
              data?.getMonth() + 1 < 10
                ? `0${data?.getMonth() + 1}`
                : `${data?.getMonth() + 1}`;
            let year = `${data?.getFullYear()}`;
            item.day = `${day}/${month}/${year}`;

            let d = new Date(item?.StartTime);
            let e = new Date(item?.EndTime);
            let horaStart =
              d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            let minStart =
              d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            let minEnd =
              e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

            item.hour = `${horaStart}:${minStart} - ${horaEnd}:${minEnd}`;
          });

          dispatch({
            type: Constants.GET_ALL_APPOINTMENTS_PACIENT,
            payload: response.data.appointments,
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
        if (error.response) {
          fnCallback(error.response.data.message);
        }
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
        if (error.response) {
          fnCallback(error.response.data.message);
        }
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
