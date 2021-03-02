import http from "~/config/httpRequest/http";

const PROCEDURE = "proceduresType";

export const addProcedureService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${PROCEDURE}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getProcedureService = (token) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${PROCEDURE}/`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const deleteProcedureService = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .delete(`${PROCEDURE}/${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editProcedureService = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`${PROCEDURE}/${id}`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const procedureService = {
  addProcedureService,
  getProcedureService,
  deleteProcedureService,
  editProcedureService,
};
export default procedureService;
