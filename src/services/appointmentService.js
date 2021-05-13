import http from "~/config/httpRequest/http";

const APPOINTMENT = "appointments";

export const addAppointmentService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${APPOINTMENT}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointment = (token) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}/`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const deleteAppointmentService = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`${APPOINTMENT}/${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editAppointmentService = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${APPOINTMENT}/${id}`, data, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const appointmentService = {
  addAppointmentService,
  getAppointment,
  deleteAppointmentService,
  editAppointmentService,
};
export default appointmentService;
