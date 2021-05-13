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
import { Formik, Form } from "formik";
import Utils from "~/helpers/Utils";
// import { useTranslation } from "react-i18next";
// import Utils from "~/helpers/Utils";
import { withRouter } from "react-router";
// import UserIcon from "~/assets/icons/user.svg";
import { isAuthenticated, getToken } from "~/services/auth";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
// import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
// import RegisterCheckbox from "~/components/common/registerInputs/RegisterCheckbox";
// import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
// import CpfCnpjUtils from "~/helpers/CpfCnpjUtils";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
// import RegisterImageInput from "~/components/common/registerInputs/RegisterImageInput";
// import driverAction from "~/actions/driverAction";
// import RegisterImageInput from "../../components/common/registerInputs/RegisterImageInput";
import procedureAction from "~/actions/procedureAction";
const ProcedureForm = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { location } = history;
  // const { t } = useTranslation();
  // const { loading } = useSelector((state) => state.app);
  // const getProfilesLoading = useSelector(
  //   (state) => state.app?.loading?.getProfilesLoading
  // );
  const addProcedureLoading = useSelector(
    (state) => state.app?.loading?.addProcedureLoading
  );

  const editProcedureLoading = useSelector(
    (state) => state.app?.loading?.editProcedureLoading
  );

  let procedure = {
    description: "",
    value: ""
  };

  if (location?.state) {
    procedure = {
      ...procedure,
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
              ...procedure,
            }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (location?.state) {
                if (isAuthenticated()) {
                  dispatch(
                    procedureAction.editProcedure(
                      values,
                      getToken(),
                      location?.state?.id,
                      "editProcedureLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          Utils.showError(error);
                          return;
                        }

                        Utils.showToast({
                          type: "success",
                          description: "Procedimento editado com sucesso!",
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
                    procedureAction.addProcedure(
                      values,
                      getToken(),

                      "addProcedureLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          Utils.showError(error);
                          return;
                        }

                        Utils.showToast({
                          type: "success",
                          description: "Procedimento cadastrado com sucesso!",
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
                    <Grid item xs={8}>
                      {/* {location?.state ? null : ( */}
                      <RegisterInputText
                        label={"Descrição"}
                        name="description"
                        maxL="255"
                      />
                      {/* )} */}
                    </Grid>
                    <Grid item xs={4}>
                      <RegisterInputText
                        label={"Valor"}
                        name="value"
                        maxL="10"
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
                          disabled={addProcedureLoading || editProcedureLoading}
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

export default withRouter(ProcedureForm);
