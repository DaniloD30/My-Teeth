import React, { useEffect } from "react";
import { isAuthenticated, getToken } from "~/services/auth";
import { withRouter } from "react-router";
import SchedulerComponent from "~/components/scheduler/SchedulerComponent";
import Page from "~/components/common/page/Page";
import userAction from "~/actions/userAction";
import appointmentAction from "~/actions/appointmentAction";
import appointmentTypeAction from "~/actions/appointmentTypeAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@material-ui/core";
import Utils from "~/helpers/Utils";
import { ToastContainer } from "react-toastify";
const Scheduler = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

  const dataAppointmentsLoading = useSelector(
    (state) => state.app?.loading?.dataAppointmentsLoading
  );

  const appointmentsData = useSelector(
    (state) => state.appointment?.appointments
  );

  const addAppointmentLoading = useSelector(
    (state) => state.appointment?.addAppointmentLoading
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
          "dataAllUserLoading",
          (error) => {
            if (error) {
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
              Utils.showError(error);
              return;
            }
          }
        )
      );
      dispatch(
        appointmentAction.getAllAppointments(
          getToken(),
          "dataAppointmentsLoading",
          (error) => {
            if (error) {
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
  }, [dispatch, history]);

  useEffect(() => {
    if (appointmentsData?.length > 0) {
      appointmentsData.map((item) => (
        item.DepartmentID = 1 ));
    }
  }, [appointmentsData]);

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        appointmentAction.getAllAppointments(
          getToken(),
          "dataAppointmentsLoading",
          (error) => {
            if (error) {
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
  }, [dispatch, history, addAppointmentLoading]);
  return (
    <>
     <ToastContainer />
      <Page>
        {dataAllUserLoading ||
        dataAppointmentsLoading ||
        appointmentTypeLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <SchedulerComponent dataAppointment={appointmentsData} />
        )}
      </Page>
    </>
  );
};

export default withRouter(Scheduler);
