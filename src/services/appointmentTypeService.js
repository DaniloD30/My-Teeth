import http from "~/config/httpRequest/http";

const APPOINTMENT = "appointmentsType";

export const addAppointmentTypeService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${APPOINTMENT}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointmentType = (token) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}/`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const deleteAppointmentTypeService = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`${APPOINTMENT}/${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editAppointmentTypeService = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${APPOINTMENT}/${id}`, data, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const appointmentTypeService = {
  addAppointmentTypeService,
  getAppointmentType,
  deleteAppointmentTypeService,
  editAppointmentTypeService,
};
export default appointmentTypeService;
