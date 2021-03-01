import Utils from "~/helpers/Utils";
import { getClinic, deleteClinicService } from "~/services/clinicaService";
import Constants from "~/helpers/enums/Constants";

// export const addClinic = (
//   params = "",
//   token,
//   LOADING_IDENTIFICATOR = ""
//   // fnCallback = () => { }
// ) => (dispatch) => {
//   dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
//   clinicaservice
//     .addClinic(params, token)
//     .then((response) => {
//       if (response) {
//         // Utils.SwalFire({
//         //   icon: 'success',
//         //   title: 'Sucesso',
//         //   text: 'Registro Cadastrado!'
//         // });
//       }
//     })
//     .catch(() => {
//       // utils.SwalFire({
//       //   icon: 'error',
//       //   title: 'Erro',
//       //   text: 'Tente novamente!'
//       // });
//     })
//     .finally(() => {
//       dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
//     });
// };

export const getAllCinics = (
  token,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));

  getClinic(token)
    .then((response) => {
      dispatch({
        type: Constants.GET_ALL_CLINICS,
        payload: response.data,
      });

      if (response) {
        // console.log('response get all =>', response.data.count);
      }
    })
    .catch(() => {
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
// export const editClinicData = (data) => (dispatch) => {
//   dispatch({
//     type: CLINICA.EDIT_CLINIC,
//     payload: data,
//   });
// };

// export const flagEdit = (flag) => (dispatch) => {
//   dispatch({
//     type: CLINICA.FLAG_EDIT,
//     payload: flag,
//   });
// };

// export const editClinic = (
//   data,
//   token,
//   id,
//   LOADING_IDENTIFICATOR = ""
//   // fnCallback = () => { }
// ) => (dispatch) => {
//   dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
//   clinicaservice
//     .editClinic(data, token, id)
//     .then((response) => {
//       if (response) {
//         // Utils.SwalFire({
//         //   icon: 'success',
//         //   title: 'Sucesso',
//         //   text: 'Editado com sucesso!'
//         // });
//       }
//     })
//     .catch(() => {
//       // Utils.SwalFire({
//       //   icon: 'error',
//       //   title: 'Erro',
//       //   text: 'Tente novamente!'
//       // });
//     })
//     .finally(() => {
//       dispatch(Utils.endLoading(LOADING_IDENTIFICATOR));
//     });
// };

export const deleteClinic = (
  token,
  id,
  LOADING_IDENTIFICATOR = "",
  fnCallback = () => {}
) => (dispatch) => {
  dispatch(Utils.startLoading(LOADING_IDENTIFICATOR));
  deleteClinicService(token, id)
    .then((response) => {
      if (response) {
        fnCallback();
        // Utils.SwalFire({
        //   icon: 'success',
        //   title: 'Sucesso',
        //   text: 'Deletado com sucesso!'
        // });
        // console.log('response get all =>', response.data.count);
      }
    })
    .catch((error) => {
      fnCallback();
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

const clinicAction = {
  getAllCinics,
  deleteClinic,
};
export default // addClinic,
clinicAction;
// deleteClinic,
// editClinic,
// editClinicData,
// flagEdit,
