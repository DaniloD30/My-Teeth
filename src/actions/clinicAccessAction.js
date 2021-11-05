import Utils from "~/helpers/Utils";
import { clinicAccessRequestService } from "~/services/clinicAccessRequestService";
// import Constants from "~/helpers/enums/Constants";

export const clinicAccess =
  (data, token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    clinicAccessRequestService(data, token)
      .then((response) => {
        if (response) {
          fnCallback();
        }
      })
      .catch((error) => {
        if (error.response) {
          fnCallback(error.response.data.message);
        }
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
      });
  };

const ClinicAccessAction = {
  clinicAccess,
};
export default ClinicAccessAction;
