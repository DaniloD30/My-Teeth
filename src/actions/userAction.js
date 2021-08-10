import Utils from "~/helpers/Utils";
import Constants from "~/helpers/enums/Constants";
import userService from "~/services/userService";

export const getDataProfile =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
      userService
        .getDataUser(token, localStorage.getItem("userid"))
        .then((response) => {
          if (response?.data) {
            // console.log("data ->", response.data)

            dispatch({
              type: Constants.GET_DADOS_PROFILE,
              payload: response.data,
            });
            localStorage.setItem("clinic_id", response?.data?.clinic_id);
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

export const savePhoto = (photo) => (dispatch) => {
  dispatch({
    type: Constants.SAVE_PHOTO_USER,
    payload: photo,
  });
};

export const editProfile =
  (data, token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
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
          if (error.response) {
            fnCallback(error.response.data.message);
          }
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

export const getAllDataProfile =
  (token, idDentist, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
      userService
        .getAllDataUser(token)
        .then((response) => {
          if (response?.data) {
            let admnistrador = [];
            let atendente = [];
            let cliente = [];
            let dentista = [];
            let profissionais = [];
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
              // console.log("item -->", item)
              // if(item?.row.clinic_id === 14){
              //   dentista.push(item);
              // }
              if (item.clinicaccesses[0]) {
                let clinicIdUser = item?.clinicaccesses[0].clinic_id;
                if (
                  parseInt(localStorage.getItem("clinic_id"), 10) === clinicIdUser
                ) {

                  item.name = item?.person?.name;
                  item.cargo = item?.profile?.name;
                  item.celPhone = item?.person?.phone_mobile;
                  item.profile_id = item?.profile?.id;

                  if (item?.profile?.name === "Administrador") {
                    admnistrador.push(item);
                  }
                  if (item?.profile?.name === "Dentista") {
                    profissionais.push(item);
                    // console.log("idDentist ->", idDentist)
                    // console.log("item id", item?.id)
                    
                    // if (idDentist) {
                    //   if (parseInt(idDentist, 10) === item?.id) {
                    //     dentista.push(item);
                    //   }
                    // } else {
                    //   dentista.push(item);
                    // }

                    /*
                LÓGICA DO DENTISTA NECESSÁRIA, PARA QUE SE FOR O DENTISTA LOGADO NO SISTEMA
                O SISTEMA APENAS RECONHECERÁ ELE COMO DENTISTA, PARA MOSTRAR NA AGENDA APENAS
                ELE
                */
                    idDentist &&
                      parseInt(idDentist, 10) === item?.id &&
                      dentista.push(item);
                    !!!idDentist && dentista.push(item);
                  }
                  if (item?.profile?.name === "Atendente") {
                    atendente.push(item);
                    profissionais.push(item);
                  }
                  if (item?.profile?.name === "Cliente") {
                    cliente.push(item);
                  }
                }
              }
            });
            dispatch({
              type: Constants.GET_ALL_DADOS_PROFILE,
              payload: {
                admnistrador,
                atendente,
                cliente,
                dentista,
                profissionais,
              },
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

export const editAddress =
  (data, token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      // console.log("Entrou na action profile")
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
      userService
        .editAddressServ(data, token, data?.id)
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
          if (error.response) {
            fnCallback(error.response.data.message);
          }
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

export const addAddress =
  (params = "", token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

      userService
        .addAddressService(params, token)
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

export const getAddress =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

      userService
        .getAddressByPersonId(token, localStorage.getItem("userid"))
        .then((response) => {
          if (response) {
            dispatch({
              type: Constants.GET_ADDRESS,
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

export const getCities =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

      userService
        .getCitiesService(token)
        .then((response) => {
          if (response) {
            response.data.rows.forEach((item, index) => {
              item.Text = item.name;
            });
            dispatch({
              type: Constants.GET_CITIES,
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

export const getStates =
  (token, LOADING_IDENTIFICATOR = "", fnCallback = () => { }) =>
    (dispatch) => {
      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

      userService
        .getStatesService(token)
        .then((response) => {
          if (response) {
            response.data.rows.forEach((item, index) => {
              item.Text = item.name;
            });

            dispatch({
              type: Constants.GET_STATES,
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

export const editUser =
  (
    data,
    token,
    id,
    isNotEditPass,
    LOADING_IDENTIFICATOR = "",
    fnCallback = () => { }
  ) =>
    (dispatch) => {
      // console.log("Entrou na action profile")
      if (isNotEditPass) {
        //Flag necessaria, para controlar quando vai enviar a senha do MD5.
        // Só é necessario passar por aqui, quando ele inserir uma novaSenha
        // Se passar uma senha que ja está em MD5 novamente no md5, ela mudará.
        var md5 = require("md5");
        data.pass = md5(data.pass);
      }

      dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
      userService
        .editUserService(data, token, id)
        // console.log("data ->", data)
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
const userAction = {
  getDataProfile,
  savePhoto,
  editProfile,
  getStates,
  getCities,
  addAddress,
  getAddress,
  editAddress,
  getAllDataProfile,
  editUser,
};
export default userAction;
