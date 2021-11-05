import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "~/components/common/page/Page";
import ProfileForm from "~/components/profile/profileForm/ProfileForm";
import ProfileDetails from "~/components/profile/detail/ProfileDetails";
import { Box, CircularProgress } from "@material-ui/core";
import { isAuthenticated, getToken } from "~/services/auth";
import userAction from "~/actions/userAction";
import Utils from "~/helpers/Utils";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { withRouter } from "react-router";
import loginAction from "~/actions/loginAction";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { history } = props;

  const getAdressLoading = useSelector(
    (state) => state.app?.loading?.getAdressLoading
  );

  const getCitiesLoading = useSelector(
    (state) => state.app?.loading?.getCitiesLoading
  );

  const getStatesLoading = useSelector(
    (state) => state.app?.loading?.getStatesLoading
  );
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        userAction.getAddress(getToken(), "getAdressLoading", (error) => {
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

      dispatch(
        userAction.getCities(getToken(), "getCitiesLoading", (error) => {
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

      dispatch(
        userAction.getStates(getToken(), "getStatesLoading", (error) => {
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

  return (
    <>
      <ToastContainer />
      <Page className={classes.root} title="Account">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ProfileForm />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              {getAdressLoading || getCitiesLoading || getStatesLoading ? (
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ProfileDetails />
              )}
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
};
export default withRouter(Profile);
