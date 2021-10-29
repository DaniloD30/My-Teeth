import http from "~/config/httpRequest/http";

const SCREENING = "screening";

export const addAnamneseService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${SCREENING}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editAnamneseService = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${SCREENING}/${id}`, data, {
        headers: { "x-access-token": token },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAnamneseService = (token, idPacient, idClinic) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${SCREENING}?clinic_id=${idClinic}&userpatient_id=${idPacient}`, {
        headers: { "x-access-token": token },
      }) 
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const anamneseService = {
  addAnamneseService,
  editAnamneseService,
  getAnamneseService,
};
export default anamneseService;
