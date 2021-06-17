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

export const getAppointment = (token, idClinic) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}?clinic_id=${idClinic}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointmentTypeByIdDentist = (token, idDentist, idClinic) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}?clinic_id=${idClinic}&userdentist_id=${idDentist}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointmentTypeByClinic = (token, idClinic) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}?clinic_id=${idClinic}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAppointmentTypeByIdPacient = (token, idPacient, idClinic) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${APPOINTMENT}?clinic_id=${idClinic}&userpatient_id=${idPacient}`, {
        headers: { "x-access-token": token },
      }) // O PACIENTE TERÁ UM ARRAY DE CLÍNICAS, ELE SERÁ ASSOCIADO A VÁRIAS CLÍNICAS
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
  getAppointmentTypeByIdDentist,
  getAppointmentTypeByClinic,
  getAppointmentTypeByIdPacient,
  deleteAppointmentService,
  editAppointmentService,
};
export default appointmentService;
