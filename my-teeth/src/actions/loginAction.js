import Utils from "~/helpers/Utils";
import Constants from "~/helpers/enums/Constants";
import loginService from "~/services/loginService";
import { login } from "~/services/auth";
export const createAccount = (
  params = "",
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
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
        // Utils.SwalFire({
        //   icon: 'success',
        //   title: 'Sucesso',
        //   text: 'Conta criada com sucesso!'
        // });
      }
    })
    .catch((error) => {
      fnCallback(error);
      // Utils.SwalFire({
      //   icon: 'error',
      //   title: 'Erro',
      //   text: 'Tente novamente!'
      // });
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const createLogin = (
  params = "",
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  var md5 = require("md5");
  params.password = md5(params.password);
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  loginService
    .createLogin(params)
    .then((response) => {
      dispatch({
        type: Constants.CREATE_LOGIN,
        payload: response.data,
      });

      if (response) {
        login(response.data.token);
        localStorage.setItem("profile_id", response.data.profileid);
        localStorage.setItem("userid", response.data.userid);
        fnCallback();
      }
    })
    .catch((error) => {
      fnCallback(error);
      // Utils.SwalFire({
      //   icon: 'error',
      //   title: 'Erro',
      //   text: 'Tente novamente!'
      // });
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export default {
  createAccount,
  createLogin,
};
