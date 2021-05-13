import http from "~/config/httpRequest/http";

const CLINIC = 'clinicTypes';

export const addClinicTypeService = (data, token) => {
    return new Promise((resolve, reject) => {
        http.post(`${CLINIC}/`, data, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const getClinicType = (token) => {
    return new Promise((resolve, reject) => {
        http.get(`${CLINIC}/`, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const getClinicTypeService = (token, id) => {
    return new Promise((resolve, reject) => {
        http.get(`${CLINIC}/${id}`, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const deleteClinicTypeService = (token, id) => {
    return new Promise((resolve, reject) => {
        http.delete(`${CLINIC}/${id}`, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const editClinicTypeService = (data, token, id) => {
    return new Promise((resolve, reject) => {
        http.put(`${CLINIC}/${id}`, data, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

const clinicTypeService = {
    addClinicTypeService,
    getClinicType,
    getClinicTypeService,
    deleteClinicTypeService,
    editClinicTypeService
}
export default clinicTypeService;


