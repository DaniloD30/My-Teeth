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
      }
    })
    .catch((error) => {
      fnCallback(error);
    })
    .finally(() => {
      dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
    });
};

// export const editProfile = (
//   data,
//   token,
//   LOADING_IDENTIFICATOR = ""
//   // fnCallback = () => { }
// ) => (dispatch) => {
//   dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
//   userService
//     .editProfile(data, token, localStorage.getItem("userid"))
//     // console.log("data ->", data)
//     .then((response) => {
//       if (response) {
//         Utils.SwalFire({
//           icon: "success",
//           title: "Sucesso",
//           text: "Registro Atualizado!",
//         });
//       }
//     })
//     .catch((response) => {
//       Utils.SwalFire({
//         icon: "error",
//         title: "Erro",
//         text: "Tente novamente!",
//       });
//     })
//     .finally(() => {
//       dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
//     });
// };

const userAction = {
  getDataProfile,
};
export default userAction;
