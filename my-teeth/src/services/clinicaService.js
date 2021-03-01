import http from "~/config/httpRequest/http";

const CLINIC = 'clinics';

export const addClinicService = (data, token) => {
    return new Promise((resolve, reject) => {
        http.post(`${CLINIC}/`, data, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const getClinic = (token) => {
    return new Promise((resolve, reject) => {
        http.get(`${CLINIC}/`, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const deleteClinicService = (token, id) => {
    return new Promise((resolve, reject) => {
        http.delete(`${CLINIC}/${id}`, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

export const editClinicService = (data, token, id) => {
    return new Promise((resolve, reject) => {
        http.put(`${CLINIC}/${id}`, data, {headers: {'x-access-token': token}})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
};

const clinicaService = {
    addClinicService,
    getClinic,
    deleteClinicService,
    editClinicService
}
export default clinicaService;


