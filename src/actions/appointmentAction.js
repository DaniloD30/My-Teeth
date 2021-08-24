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
  (token, LOADING_IDENTIFICATOR = "", flagMyConsults, fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    // necessario passar o ID da clinic aqui. Cada clinica responsavel apenas pelo dados
    // da sua clinica.
    getAppointment(token, localStorage.getItem("clinic_id"))
      .then((response) => {
        if (response) {
          response.data.appointments.rows.forEach((item) => {
            // let d = new Date(item?.StartTime);
            // let e = new Date(item?.EndTime);
            // let horaStart =
            //   d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            // let minStart =
            //   d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            // let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            // let minEnd =
            //   e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();
            item.pacientName = item?.person?.name;
            item.hour = Utils.getFormatHour(item?.StartTime, item?.EndTime);
            item.day = Utils.getFormatDay(item?.StartTime);
          });
          if(flagMyConsults){
            /*
            ---- Flag necessária para a tela de Consultas.
            ---- Por enquanto, essa flag só vai ser TRUE, na view myConsults
            */
            dispatch({
              type: Constants.GET_ALL_APPOINTMENTS_MYCONSULTS,
              payload: response.data.appointments,
            });
          }
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
            item.statusName = item?.appointments_status?.status
            item.pacientName = item?.person?.name;
            item.day = Utils.getFormatDay(item?.StartTime);
            item.hour = Utils.getFormatHour(item?.StartTime, item?.EndTime);

            // DATA
            // let data = new Date(item?.StartTime);
            // item.pacient = item
            // a data tbm tem que verificar se é menor que 10
            // let day =
            //   data?.getDate() < 10
            //     ? `0${data?.getDate()}`
            //     : `${data?.getDate()}`;
            // let month =
            //   data?.getMonth() + 1 < 10
            //     ? `0${data?.getMonth() + 1}`
            //     : `${data?.getMonth() + 1}`;
            // let year = `${data?.getFullYear()}`;

            // HORA
            // let d = new Date(item?.StartTime);
            // let e = new Date(item?.EndTime);
            // let horaStart =
            //   d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            // let minStart =
            //   d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            // let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            // let minEnd =
            //   e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();
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
            item.statusName = item?.appointments_status?.status;
            response.data.nameDentist.rows.forEach((itemDentist) => {
              // itemDentist?.id  === item?.userdentist_id && item.dentistName = itemDentist?.person?.name
              if (itemDentist?.id === item?.userdentist_id) {
                item.dentistName = itemDentist?.person?.name;
              }
            });
            item.clinicName = item?.clinic?.company_name;
            item.day =Utils.getFormatDay(item?.StartTime)
            item.hour = Utils.getFormatHour(item?.StartTime, item?.EndTime)
            // let data = new Date(item?.StartTime);
            // let day =
            //   data?.getDate() < 10
            //     ? `0${data?.getDate()}`
            //     : `${data?.getDate()}`;
            // let month =
            //   data?.getMonth() + 1 < 10
            //     ? `0${data?.getMonth() + 1}`
            //     : `${data?.getMonth() + 1}`;
            // let year = `${data?.getFullYear()}`;
            

            // let d = new Date(item?.StartTime);
            // let e = new Date(item?.EndTime);
            // let horaStart =
            //   d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
            // let minStart =
            //   d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

            // let horaEnd = e.getHours() < 10 ? `0${e.getHours()}` : e.getHours();
            // let minEnd =
            //   e.getMinutes() < 10 ? `0${e.getMinutes()}` : e.getMinutes();

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
