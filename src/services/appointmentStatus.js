import http from "~/config/httpRequest/http";

const APPOINTMENT = "appointmentsStatus";

export const addAppointmentStatusService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${APPOINTMENT}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointmentStatus = (token) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}/`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const deleteAppointmentStatusService = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`${APPOINTMENT}/${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editAppointmentStatusService = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${APPOINTMENT}/${id}`, data, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const appointmentStatusService = {
  addAppointmentStatusService,
  getAppointmentStatus,
  deleteAppointmentStatusService,
  editAppointmentStatusService,
};
export default appointmentStatusService;
