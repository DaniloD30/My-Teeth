import Utils from "~/helpers/Utils";
import {
  addProcedureService,
  getProcedureService,
  deleteProcedureService,
  editProcedureService,
} from "~/services/proceduresService";
import Constants from "~/helpers/enums/Constants";

export const addProcedure = (
  params = "",
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  params.clinic_id = localStorage.getItem("clinic_id")
  addProcedureService(params, token)
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

export const getAllProcedures = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getProcedureService(token)
    .then((response) => {
      if (response) {
        dispatch({
          type: Constants.GET_ALL_PROCEDURES,
          payload: response.data,
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

export const editProcedure = (
  data,
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  editProcedureService(data, token, id)
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

export const deleteProcedure = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteProcedureService(token, id)
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

const procedureAction = {
  getAllProcedures,
  addProcedure,
  editProcedure,
  deleteProcedure,
};
export default procedureAction;
