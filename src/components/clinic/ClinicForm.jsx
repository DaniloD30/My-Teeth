import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Card from "~/components/common/expansionCard/Card";
import {
  Grid,
  Box,
  Button,
  // CircularProgress,
  Paper,
  // Typography,
} from "@material-ui/core";
import loginAction from "~/actions/loginAction";
import { Formik, Form } from "formik";
import Utils from "~/helpers/Utils";
// import { useTranslation } from "react-i18next";
// import Utils from "~/helpers/Utils";
import { withRouter } from "react-router";
// import UserIcon from "~/assets/icons/user.svg";
import { isAuthenticated, getToken } from "~/services/auth";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
// import RegisterCheckbox from "~/components/common/registerInputs/RegisterCheckbox";
// import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
// import CpfCnpjUtils from "~/helpers/CpfCnpjUtils";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
// import RegisterImageInput from "~/components/common/registerInputs/RegisterImageInput";
// import driverAction from "~/actions/driverAction";
// import RegisterImageInput from "../../components/common/registerInputs/RegisterImageInput";
import clinicAction from "~/actions/clinicAction";
const ClinicForm = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { location } = history;
  // const { t } = useTranslation();
  // const { loading } = useSelector((state) => state.app);
  // const getProfilesLoading = useSelector(
  //   (state) => state.app?.loading?.getProfilesLoading
  // );
  const addClinicLoading = useSelector(
    (state) => state.app?.loading?.addClinicLoading
  );

  const editClinicLoading = useSelector(
    (state) => state.app?.loading?.editClinicLoading
  );

  let clinic = {
    company_name: "Clinica TESTE COMPANY",
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

  if (location?.state) {
    clinic = {
      ...clinic,
      ...location?.state,
    };
  }

  useEffect(() => {
    // console.log("location state ->", location.state);
    // console.log("location pathname ->", location.pathname);
    // console.log("location state true or false ->", location?.state);
    // if (location?.state) {
    // 	dispatch(groupPointsAction.getPointsLinkedGroupById(location.state.Id));
    // 	dispatch(groupPointsAction.getAvailablePointsForGroupById(location.state.Id));
    // }
  }, [history, location.pathname, location.state]);

  useEffect(() => {
    // dispatch(profileAction.getProfiles("getProfilesLoading", 1));
    // dispatch(resourceAction.getResources("getResourceLoading"));
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Paper>
        <Box id="userForm" style={{ padding: "10px" }}>
          <Formik
            initialValues={{
              ...clinic,
            }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (location?.state) {
                if (isAuthenticated()) {
                  dispatch(
                    clinicAction.editClinic(
                      values,
                      getToken(),
                      location?.state?.id,
                      "editClinicLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          if (error === "Failed to authenticate token!") {
                            Utils.showError("Não autenticado!");
                            dispatch(loginAction.logoutUser());
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
                          props.comeback();
                        }, 3000);

                        // props.comeback();
                      }
                    )
                  );
                } else {
                  Utils.showError("Não autenticado!");
                  setTimeout(function () {
                    props.history.push("/login");
                  }, 3000);
                }
              } else {
                //               params = "",
                // token,
                // LOADING_IDENTIFICATOR = "",
                if (isAuthenticated()) {
                  dispatch(
                    clinicAction.addClinic(
                      values,
                      getToken(),

                      "addClinicLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          if (error === "Failed to authenticate token!") {
                            Utils.showError("Não autenticado!");
                            dispatch(loginAction.logoutUser());
                            return;
                          }
                          Utils.showError(error);
                          return;
                        }

                        Utils.showToast({
                          type: "success",
                          description: "Clínica cadastrada com sucesso!",
                        });

                        setTimeout(function () {
                          props.comeback();
                        }, 3000);

                        // props.comeback();
                      }
                    )
                  );
                } else {
                  Utils.showError("Não autenticado!");
                  setTimeout(function () {
                    props.history.push("/login");
                  }, 3000);
                }
              }
            }}
          >
            {({ submitForm, resetForm }) => (
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
                      <RegisterInputText label={"Site"} name="site" maxL="20" />
                    </Grid>
                    <Grid item xs={4}>
                      <RegisterInputText label={"type"} name="type" maxL="20" />
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
                          id="driver-cancel-button"
                          className="cancel-button"
                          variant="contained"
                          size="large"
                          disableElevation
                          fullWidth
                          onClick={() => {
                            props.comeback();
                          }}
                          // disabled={loading.driver}
                        >
                          {/* <CancelIcon /> */}
                          Cancelar
                        </Button>
                      </Box>
                    </Grid>
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
                          disabled={addClinicLoading || editClinicLoading}
                          onClick={submitForm}
                          // disabled={loading.driver}
                          // startIcon={loading.driver ? <CircularProgress size={18} /> : <ConfirmIcon />}
                          // startIcon={<ConfirmIcon />}
                        >
                          Confirmar
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </>
  );
};

export default withRouter(ClinicForm);
