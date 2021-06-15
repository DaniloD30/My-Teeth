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
          login(response?.data?.token);
          dispatch(addProfileId(response?.data?.profileid));
          // console.log("response?.data?.profileid", response?.data?.profileid);
          // localStorage.setItem("profile_id", response?.data?.profileid);

          localStorage.setItem("userid", response?.data?.userid);
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

const logoutUser = () => (dispatch) => {
  localStorage.removeItem("profile_id");
  localStorage.removeItem("userid");
  logout();
  dispatch({ type: Constants.LOGOUT });
};

const addProfileId = (data) => (dispatch) => {
  dispatch({
    type: Constants.SAVE_PROFILE_ID,
    payload: data,
  });
};
const loginAction = {
  createAccount,
  createLogin,
  logoutUser,
};
export default loginAction;
