import Utils from "~/helpers/Utils";
import { addAnamneseService, editAnamneseService, getAnamneseService } from "~/services/anamneseService";
import Constants from "~/helpers/enums/Constants";

export const addAnamnese =
  (params = "", token, LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

    addAnamneseService(params, token)
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

  export const getAnamnese = (
    token,
    idPacient,
    LOADING_IDENTIFICATOR = "",
    fnCallback = () => {}
  ) => (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  
    getAnamneseService(token,idPacient, localStorage.getItem("clinic_id"))
      .then((response) => {
        if (response) {
          dispatch({
            type: Constants.GET_ANAMNESE,
            payload: response?.data,
          });
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

  export const editAnamnese = (
    data,
    token,
    id,
    LOADING_IDENTIFICATOR = "",
    fnCallback = () => {}
  ) => (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  
    editAnamneseService(data, token, id)
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


const AnamneseAction = {
  addAnamnese,
  editAnamnese,
  getAnamnese
};
export default AnamneseAction;
