import React, { useEffect } from "react";
import { isAuthenticated, getToken } from "~/services/auth";
import { withRouter } from "react-router";
import Page from "~/components/common/page/Page";
import clinicAction from "~/actions/clinicAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@material-ui/core";
import Utils from "~/helpers/Utils";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import MyClinicForm from "../../components/myClinicForm/MyClinicForm";
import loginAction from "~/actions/loginAction";
const MyClinic = (props) => {
  const dispatch = useDispatch();
  const { history } = props;
  const [dataClinicUser, setClinicUser] = useState([]);
  const clinicUser = useSelector((state) => state.clinic.clinicUser);
  const dataClinicLoading = useSelector(
    (state) => state.app?.loading?.dataClinicLoading
  );
  useEffect(() => {
    // appointmentTypeAction
    if (isAuthenticated()) {
      dispatch(
        clinicAction.getClinicUser(getToken(), "dataClinicLoading", (error) => {
          if (error) {
            if (error === "Failed to authenticate token!") {
              Utils.showError("Não autenticado!");
              dispatch(loginAction.logoutUser());
              return;
            }
            Utils.showError(error);
            return;
          }
        })
      );
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, history]);

  useEffect(() => {
    if (clinicUser) {
      setClinicUser(clinicUser);
    }
  }, [clinicUser]);

  return (
    <>
      <ToastContainer />
      <Page>
        {dataClinicLoading ? (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <MyClinicForm  data={dataClinicUser}/>
        )}
      </Page>
    </>
  );
};

export default withRouter(MyClinic);
