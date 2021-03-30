import React, { useEffect } from "react";
import { isAuthenticated, getToken } from "~/services/auth";
import { withRouter } from "react-router";
import SchedulerComponent from "~/components/scheduler/SchedulerComponent";
import Page from "~/components/common/page/Page";
import userAction from "~/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@material-ui/core";
import Utils from "~/helpers/Utils";
const Scheduler = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(userAction.getAllDataProfile(getToken(), "dataAllUserLoading"));
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

  return (
    <>
      <Page>
        {dataAllUserLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <SchedulerComponent />
        )}
      </Page>
    </>
  );
};

export default withRouter(Scheduler);
