import http from "~/config/httpRequest/http";

const CREATE = 'createAccount';
const LOGIN = 'login'
export const createAccount = (data) => {
    return new Promise((resolve, reject) => {
        http.post(`${CREATE}/`, data)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const createLogin = (data) => {
    return new Promise((resolve, reject) => {
        http.post(`${LOGIN}/`, data)
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

const loginService = {
    createAccount,
    createLogin
}
export default loginService;