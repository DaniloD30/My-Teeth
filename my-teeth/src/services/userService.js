import http from "~/config/httpRequest/http";
const USER = 'users';

export const getDataUser = (token,  id) => {
  return new Promise((resolve, reject) => {
    http
      .get(`${USER}/${id}`, { headers: { 'x-access-token': token } })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
};

export const editProfileServ = (data, token, id) => {
  return new Promise((resolve, reject) => {
    http.put(`persons/${id}`, data, {headers: {'x-access-token': token}})
    .then(response => resolve(response))
    .catch(error => reject(error));
  })
}

const userService = {
    getDataUser,
    editProfileServ
}

export default userService;
