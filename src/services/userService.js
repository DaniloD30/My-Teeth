import http from "~/config/httpRequest/http";
const USER = "users";

export const getDataUser = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${USER}/${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAllDataUser = (token) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${USER}/`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editProfileServ = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`persons/${id}`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const editAddressServ = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http
      .put(`address/${id}`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const addAddressService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`address/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAddressByPersonId = (token, id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`address?personId=${id}`, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const userService = {
  getDataUser,
  getAddressByPersonId,
  addAddressService,
  editProfileServ,
  getAllDataUser,
  editAddressServ,
};

export default userService;
