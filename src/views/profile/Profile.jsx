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
  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        userAction.getAddress(getToken(), "getAdressLoading", (error) => {
          if (error) {
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
              {getAdressLoading ? (
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
