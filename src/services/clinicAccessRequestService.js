import http from "~/config/httpRequest/http";

const CLINIC_ACCESS_REQUEST = "clinicAccessRequest";

export const clinicAccessRequestService = (data, token) => {
  return new Promise((resolve, reject) => {
    http
      .post(`${CLINIC_ACCESS_REQUEST}/`, data, { headers: { "x-access-token": token } })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};


const clinicAccessService = {
    clinicAccessRequestService,
};

export default clinicAccessService;
