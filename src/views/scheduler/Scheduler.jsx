import React, { useEffect } from "react";
import { isAuthenticated, getToken } from "~/services/auth";
import { withRouter } from "react-router";
import SchedulerComponent from "~/components/scheduler/SchedulerComponent";
import Page from "~/components/common/page/Page";
import userAction from "~/actions/userAction";
import appointmentAction from "~/actions/appointmentAction";
import appointmentTypeAction from "~/actions/appointmentTypeAction";
import appointmentStatusAction from "~/actions/appointmentStatusAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@material-ui/core";
import Utils from "~/helpers/Utils";
import { ToastContainer } from "react-toastify";
import { Typography } from "@material-ui/core";
import loginAction from "~/actions/loginAction";
const Scheduler = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

  const dentistasData = useSelector((state) => state.user?.dentista);

  const dataAppointmentsLoading = useSelector(
    (state) => state.app?.loading?.dataAppointmentsLoading
  );

  const appointmentsData = useSelector(
    (state) => state.appointment?.appointments
  );

  // const addAppointmentLoading = useSelector(
  //   (state) => state.appointment?.addAppointmentLoading
  // );
  const profileData = useSelector((state) => state.login.profileId);

  const getStatusLoading = useSelector(
    (state) => state.app?.loading?.getStatusLoading
  );

  const appointmentTypeLoading = useSelector(
    (state) => state.app?.loading?.appointmentTypeLoading
  );

  useEffect(() => {
    // appointmentTypeAction
    if (isAuthenticated()) {
      dispatch(
        userAction.getAllDataProfile(
          getToken(),
          profileData === 2 && localStorage.getItem("userid"),
          "dataAllUserLoading",
          (error) => {
            if (error) {
              if (error === "Failed to authenticate token!") {
                Utils.showError("Não autenticado!");
                dispatch(loginAction.logoutUser());
                return;
              }
              Utils.showError(error);
              return;
            }
          }
        )
      );
      dispatch(
        appointmentTypeAction.getAllAppointmentsType(
          getToken(),
          "appointmentTypeLoading",
          (error) => {
            if (error) {
              if (error === "Failed to authenticate token!") {
                Utils.showError("Não autenticado!");
                dispatch(loginAction.logoutUser());
                return;
              }
              Utils.showError(error);
              return;
            }
          }
        )
      );
      // console.log("ele executa isso aqui depois do add ")
      dispatch(
        appointmentAction.getAllAppointments(
          getToken(),
          "dataAppointmentsLoading",
          false,
          (error) => {
            if (error) {
              if (error === "Failed to authenticate token!") {
                Utils.showError("Não autenticado!");
                dispatch(loginAction.logoutUser());
                return;
              }
              Utils.showError(error);
              return;
            }
          }
        )
      );

      dispatch(
        appointmentStatusAction.getAllAppointmentsStatus(
          getToken(),
          "getStatusLoading",
          (error) => {
            if (error) {
              if (error === "Failed to authenticate token!") {
                Utils.showError("Não autenticado!");
                dispatch(loginAction.logoutUser());
                return;
              }
              Utils.showError(error);
              return;
            }
          }
        )
      );
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, history, profileData]);

  // useEffect(() => {
  //   if (appointmentsData?.length > 0) {
  //     appointmentsData.map((item) => (item.DepartmentID = 1));
  //   }
  // }, [appointmentsData]);

  // useEffect(() => {
  //   DISPATCH COM FLAG DE ADD ONDE SO VAI EXECUTAR O GET SE A FLAG ESTIVER COMO TRUE
  //   FUNÇÃO QUE SÓ EXECUTA COM A ACTION

  //   VERIFICAR EM QUAIS PARTES DO SISTEMA, TEM ESSE USEeFFECT SOLTO,
  //   ONDE ACABA TENDO CHAMADAS REPETIDAS ...

  //   if (isAuthenticated()) {
  //     addAppointmentLoading &&
  //     console.log("entrou no dispatch do add appointment")
  //       dispatch(
  //         appointmentAction.getAllAppointments(
  //           getToken(),
  //           "dataAppointmentsLoading",
  //           (error) => {
  //             if (error) {
  //               Utils.showError(error);
  //               return;
  //             }
  //           }
  //         )
  //       );
  //   } else {
  //     Utils.showError("Não autenticado!");
  //     setTimeout(function () {
  //       history.push("/login");
  //     }, 3000);
  //   }
  // }, [dispatch, history, addAppointmentLoading]);

  return (
    <>
      <ToastContainer />
      <Page>
        {dataAllUserLoading ||
          dataAppointmentsLoading ||
          appointmentTypeLoading ||
          getStatusLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) :
          appointmentsData?.length < 1 ? (
            <Typography variant="h3" style={{ textAlign: "center" }}>
              Nenhuma consulta encontrada!
            </Typography>
          ) :
            dentistasData?.length < 1 ? (
              <Typography variant="h3" style={{ textAlign: "center" }}>
                Nenhum dentista encontrado!
              </Typography>
            ) : (
              <SchedulerComponent dataAppointment={appointmentsData} />
            )}
      </Page>
    </>
  );
};

export default withRouter(Scheduler);
