import Utils from "~/helpers/Utils";
import Constants from "~/helpers/enums/Constants";
import loginService from "~/services/loginService";
import { login, logout } from "~/services/auth";
export const createAccount =
  (params = "", LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    var md5 = require("md5");
    params.pass = md5(params.pass);
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    loginService
      .createAccount(params)
      .then((response) => {
        if (response) {
          // alert("response =>", response)
          fnCallback();

          dispatch({
            type: Constants.CREATE_ACCOUNT,
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

export const createLogin =
  (params = "", LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    var md5 = require("md5");
    params.password = md5(params.password);
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    loginService
      .createLogin(params)
      .then((response) => {
        if (response?.data?.auth) {
          dispatch({
            type: Constants.CREATE_LOGIN,
            payload: response?.data,
          });
          login(response?.data?.userPayload.token);
          dispatch(addProfileId(response?.data?.userPayload.profileid));
          // console.log("response?.data?.profileid", response?.data?.profileid);
          // localStorage.setItem("profile_id", response?.data?.profileid);
          localStorage.setItem("profileid", response?.data?.userPayload.profileid);
          localStorage.setItem("userid", response?.data?.userPayload.userid);
          localStorage.setItem("clinic_id", response?.data?.userPayload.clinicId)
          fnCallback();
        }
      })
      .catch((error) => {
        if (error.response) {
          fnCallback(error.response.data.message);
        }
        // console.log("Login erro ->")
      })
      .finally(() => {
        dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
      });
  };

const loginUserAboutRefreshWindow =
  (LOADING_IDENTIFICATOR = "", fnCallback = () => {}) =>
  (dispatch) => {
    dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
    let data = {
      auth: true,
    };
    dispatch({
      type: Constants.CREATE_LOGIN,
      payload: data,
    });
    dispatch(addProfileId(parseInt(localStorage.getItem("profileid"), 10)));
    fnCallback();
    dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));

  };
const logoutUser = () => (dispatch) => {
  // dispatch({ type: Constants.CLEAR_REDUCER_APPOINTMENTS });
  // dispatch({ type: Constants.CLEAR_REDUCER_APPOINTMENTS });
  // localStorage.removeItem("profile_id");
  localStorage.removeItem("profileid");
  localStorage.removeItem("userid");
  localStorage.removeItem("clinic_id");
  // dispatch({ type: Constants.LOGOUT });
  logout();
  dispatch({ type: Constants.RESET_STORE });
};

const addProfileId = (data) => (dispatch) => {
  dispatch({
    type: Constants.SAVE_PROFILE_ID,
    payload: data,
  });
};
const loginAction = {
  createAccount,
  loginUserAboutRefreshWindow,
  createLogin,
  logoutUser,
};
export default loginAction;
