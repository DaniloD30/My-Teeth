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
const Scheduler = (props) => {
  const dispatch = useDispatch();
  const { history } = props;

  // const dataS = [
  //   {
  //     Id: 5,
  //     Subject: "ISA Annual Conference",
  //     StartTime: "2020-07-13T17:00:00.000Z",
  //     EndTime: "2020-07-13T18:00:00.000Z",
  //     EventType: "commercial-event",
  //     City: "USA",
  //     CategoryColor: "#00bdae",
  //   },
  // ];

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

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

  const dataAppointmentsLoading = useSelector(
    (state) => state.app?.loading?.dataAppointmentsLoading
  );
  
  const appointmentsData = useSelector(
    (state) => state.appointment?.appointments
  );

  const appointmentTypeLoading = useSelector(
    (state) => state.app?.loading?.appointmentTypeLoading
  );

  useEffect(() => {
    if (appointmentsData.length > 0) {
      appointmentsData.map((item) => {
        item.userdentist_id = 344;
        item.DepartmentID = 1;
        item.IsAllDay = false;
      });
    }
  }, [appointmentsData]);
  return (
    <>
      <Page>
        {dataAllUserLoading || dataAppointmentsLoading || appointmentTypeLoading ? (
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
