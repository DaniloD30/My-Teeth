import Utils from "~/helpers/Utils";
import Constants from "~/helpers/enums/Constants";
import userService from "~/services/userService";
export const getDataProfile = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  userService
    .getDataUser(token, localStorage.getItem("userid"))
    .then((response) => {
      if (response?.data) {
        dispatch({
          type: Constants.GET_DADOS_PROFILE,
          payload: response.data,
        });
        localStorage.setItem("clinic_id", response?.data?.clinic_id);
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const savePhoto = (photo) => (dispatch) => {
  dispatch({
    type: Constants.SAVE_PHOTO_USER,
    payload: photo,
  });
};

export const editProfile = (
  data,
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  // console.log("Entrou na action profile")
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  userService
    .editProfileServ(data, token, localStorage.getItem("userid"))
    // console.log("data ->", data)
    .then((response) => {
      if (response) {
        fnCallback();
        // Utils.SwalFire({
        //   icon: "success",
        //   title: "Sucesso",
        //   text: "Registro Atualizado!",
        // });
      }
    })
    .catch((error) => {
      fnCallback(error);
      // Utils.SwalFire({
      //   icon: "error",
      //   title: "Erro",
      //   text: "Tente novamente!",
      // });
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

export const getAllDataProfile = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  userService
    .getAllDataUser(token)
    .then((response) => {
      if (response?.data) {
        let admnistrador = [];
        let atendente = [];
        let cliente = [];
        let dentista = [];
        // response?.data?.rows.map((item) => {
        //   if (item?.profile?.name === "Administrador") {
        //     admnistrador.push(item);
        //   }
        //   if (item?.profile?.name === "Dentista") {
        //     dentista.push(item);
        //   }
        //   if (item?.profile?.name === "Atendente") {
        //     atendente.push(item);
        //   }
        //   if (item?.profile?.name === "Cliente") {
        //     cliente.push(item);
        //   }
        // });
        // for (const item of response?.data?.rows) {
        //   console.log("item =>", item)
        //   if (item?.profile?.name === "Administrador") {
        //     admnistrador.push(item);
        //   }
        //   if (item?.profile?.name === "Dentista") {
        //     dentista.push(item);
        //   }
        //   if (item?.profile?.name === "Atendente") {
        //     atendente.push(item);
        //   }
        //   if (item?.profile?.name === "Cliente") {
        //     cliente.push(item);
        //   }
        // }
        response?.data?.rows.forEach((item) => {
          // console.log("item =>", item)
          if (item?.profile?.name === "Administrador") {
            admnistrador.push(item);
          }
          if (item?.profile?.name === "Dentista") {
            dentista.push(item);
          }
          if (item?.profile?.name === "Atendente") {
            atendente.push(item);
          }
          if (item?.profile?.name === "Cliente") {
            cliente.push(item);
          }
        });
        dispatch({
          type: Constants.GET_ALL_DADOS_PROFILE,
          payload: { admnistrador, atendente, cliente, dentista },
        });
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

const userAction = {
  getDataProfile,
  savePhoto,
  editProfile,
  getAllDataProfile,
};
export default userAction;
