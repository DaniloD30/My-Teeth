import React from "react";
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import SaveIcon from "@material-ui/icons/Save";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import clinicAction from "~/actions/clinicAction";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, getToken } from "~/services/auth";
import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
const useStyles = makeStyles(() => ({
  root: {},
}));

const MyClinicForm = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const editClinicLoading = useSelector(
    (state) => state.app?.loading?.editClinicLoading
  );

  let clinic = {
    company_name: "Clinica ",
    main_office: "Sim",
    cnpj: "12345678910123",
    state_registration: "1234321",
    municipal_registration: "34565432",
    site: "www.clinicadenison.com.br",
    type: 1,
    due_date: "10",
    service_rate: 1,
    login_wirecard: "Sim",
    payment_slip: 0,
    payment_transfer: 0,
    payment_card: 1,
    clinic_type_id: 1,
  };

  if (data) {
    clinic = data;
  }

  return (
    <form autoComplete="off" noValidate className={classes.root}>
      <ToastContainer />
      <Card>
        <CardHeader subheader="A informação pode ser editada" title="Clínica" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{ ...clinic }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (isAuthenticated()) {
                dispatch(
                  clinicAction.editClinic(
                    values,
                    getToken(),
                    localStorage.getItem("clinic_id"),
                    "editClinicLoading",
                    (error) => {
                      setSubmitting(false);

                      if (error) {
                        if (error === "Failed to authenticate token!") {
                          Utils.showError("Não autenticado!");
                          dispatch(loginAction.logoutUser());
                          // setTimeout(function () {
                          //   props.history.push("/login");
                          // }, 3000);
                          return;
                        }
                        Utils.showError(error);
                        return;
                      }

                      Utils.showToast({
                        type: "success",
                        description: "Clínica editada com sucesso!",
                      });

                      setTimeout(function () {
                        dispatch(
                          clinicAction.getClinicUser(
                            getToken(),
                            "dataClinicLoading",
                            (error) => {
                              if (error) {
                                if (error === "Failed to authenticate token!") {
                                  Utils.showError("Não autenticado!");
                                  dispatch(loginAction.logoutUser());
                                  // setTimeout(function () {
                                  //   props.history.push("/login");
                                  // }, 3000);
                                  return;
                                }
                                Utils.showError(error);
                                return;
                              }
                            }
                          )
                        );
                      }, 3000);

                      // props.comeback();
                    }
                  )
                );
              } else {
                Utils.showError("Não autenticado!");
                setTimeout(function () {
                  history.push("/login");
                }, 3000);
              }
            }}
            render={({ submitForm, setFieldValue }) => {
              return (
                <Form className="ceabs-register-form">
                  <Grid
                    container
                    direction="row"
                    alignItems="stretch"
                    spacing={0}
                  >
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        {/* {location?.state ? null : ( */}
                        <RegisterInputText
                          label={"Nome da Clínica"}
                          name="company_name"
                          maxL="255"
                        />
                        {/* )} */}
                      </Grid>
                      <Grid item xs={8}>
                        <RegisterInputText
                          label={"Main Office"}
                          name="main_office"
                          maxL="3"
                        />
                        {/* <RegisterImageInput
                        name={"foto"}    
                        placholderIcon={
                          <img src={UserIcon} alt={"Icon Close"} {...props} />
                        }
                        accept=".jpg, .png, .jpeg"
                      /> */}
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <RegisterMaskedTextInput
                          label={"cnpj"}
                          name="cnpj"
                          mask="99.999.999/9999-99"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"Municipal Registration"}
                          name="municipal_registration"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"State Registration"}
                          name="state_registration"
                          maxL="20"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"Site"}
                          name="site"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"type"}
                          name="type"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"Due date"}
                          name="due_date"
                          maxL="20"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"service_rate"}
                          name="service_rate"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"login_wirecard"}
                          name="login_wirecard"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"payment_slip"}
                          name="payment_slip"
                          maxL="20"
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"payment_transfer"}
                          name="payment_transfer"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"payment_card"}
                          name="payment_card"
                          maxL="20"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <RegisterInputText
                          label={"clinic_type_id"}
                          name="clinic_type_id"
                          maxL="20"
                        />
                      </Grid>
                    </Grid>

                    {/* <Grid item xs={12} md={2}></Grid> */}

                    <Grid
                      container
                      // direction="row"
                      justify="flex-end"
                      spacing={4}
                    >
                      <Grid item xs={2}>
                        <Box className="button-form">
                          <Button
                            id="driver-submit-button"
                            variant="contained"
                            className="save-button"
                            color="primary"
                            size="large"
                            fullWidth
                            disableElevation
                            disabled={editClinicLoading}
                            onClick={submitForm}
                            // disabled={loading.driver}
                            // startIcon={loading.driver ? <CircularProgress size={18} /> : <ConfirmIcon />}
                            // startIcon={<ConfirmIcon />}
                          >
                            {editClinicLoading ? (
                              <CircularProgress
                                style={{
                                  height: 14,
                                  width: 14,
                                  marginRight: 8,
                                }}
                                color={"#fff"}
                              />
                            ) : (
                              <SaveIcon />
                            )}
                            Atualizar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          />
        </CardContent>
        <Divider />
        {/* <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box> */}
      </Card>
    </form>
  );
};

// ProfileDetails.propTypes = {
//   className: PropTypes.string
// };

export default withRouter(MyClinicForm);
