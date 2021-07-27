import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Card from "~/components/common/expansionCard/Card";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Paper,
  // Typography,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Formik, Form } from "formik";
import Utils from "~/helpers/Utils";
// import { useTranslation } from "react-i18next";
// import Utils from "~/helpers/Utils";
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
import { withRouter } from "react-router";
// import UserIcon from "~/assets/icons/user.svg";
import { isAuthenticated, getToken } from "~/services/auth";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import loginAction from "~/actions/loginAction";
import userAction from "~/actions/userAction";
// import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
// import RegisterCheckbox from "~/components/common/registerInputs/RegisterCheckbox";
// import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
// import CpfCnpjUtils from "~/helpers/CpfCnpjUtils";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
// import RegisterImageInput from "~/components/common/registerInputs/RegisterImageInput";
// import driverAction from "~/actions/driverAction";
// import RegisterImageInput from "../../components/common/registerInputs/RegisterImageInput";
// import procedureAction from "~/actions/procedureAction";
const ProfessionalForm = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { location } = history;
  // const { t } = useTranslation();
  // const { loading } = useSelector((state) => state.app);
  // const getProfilesLoading = useSelector(
  //   (state) => state.app?.loading?.getProfilesLoading
  // );

  // const accountCreateSuccess = useSelector(
  //   (state) => state?.login?.accountCreateSuccess
  // );

  const loginCreateLoading = useSelector(
    (state) => state?.app?.loading?.loginCreateLoading
  );

  const editUserLoading = useSelector(
    (state) => state?.app?.loading?.editUserLoading
  );

  let user = {
    name: "",
    pass: null,
    email: "",
    genre: "",
    // plan_id: "",
    profileId: "",
    // clinic_id: localStorage.getItem("clinic_id"),
    clinic_id: localStorage.getItem("clinic_id"),
  };

  if (location?.state) {
    user = {
      ...user,
      ...location?.state,
    };
  }

  return (
    <>
      <ToastContainer />
      <Paper>
        <Box id="userForm" style={{ padding: "10px" }}>
          <Formik
            initialValues={{ ...user }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "E-mail Obrigatório";
              } else if (!Utils.isValidEmail(values.email)) {
                errors.email = "E-mail inválido";
              }

              if (!values.name) {
                errors.name = "Nome Obrigatório";
              }
              if (!values.pass) {
                errors.pass = "Senha Obrigatória";
              }
              // if (!values.profile_id) {
              //   errors.profile_id = "Perfil Obrigatório";
              // }

              // if (!values.plan_id) {
              //   errors.plan_id = "Plano Obrigatório";
              // }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (location?.state) {
                let dataUser = {
                  pass:
                    values.pass !== location?.state?.pass
                      ? values.pass
                      : location?.state?.pass,
                  profileId: values?.profileId,
                  clinic_id: localStorage.getItem("clinic_id"),
                };
                if (isAuthenticated()) {
                  dispatch(
                    userAction.editUser(
                      dataUser,
                      getToken(),
                      location?.state?.id,
                      values.pass !== location?.state?.pass ? true : false,
                      "editUserLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          Utils.showError(error);
                          return;
                        }

                        Utils.showToast({
                          type: "success",
                          description: "Profissional editado com sucesso!",
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
                values.profile_id = values.profileId
                if (isAuthenticated()) {
                  dispatch(
                    loginAction.createAccount(
                      values,
                      "loginCreateLoading",
                      (error) => {
                        setSubmitting(false);
                        if (error) {
                          Utils.showError(error);
                          return;
                        }
                        // console.log("ENTROU NO CALLBACK");
                        Utils.showToast({
                          type: "success",
                          description:
                            "Usuário cadastrado com sucesso, e-mail de ativação enviado ao login cadastrado!",
                        });

                        setTimeout(function () {
                          props.comeback();
                        }, 3000);
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
            render={({ submitForm, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    {!!!location?.state && (
                      <Grid item xs={6}>
                        <RegisterInputText label={"Nome"} name="name" />
                      </Grid>
                    )}
                    {location?.state ? (
                      <Grid item xs={6}>
                        <RegisterInputText
                          label={"Nova Senha"}
                          name="pass"
                          type="password"
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={6}>
                        <RegisterInputText
                          label={"Senha"}
                          name="pass"
                          type="password"
                        />
                      </Grid>
                    )}
                    {/* <Grid item xs={6}>
                      <RegisterInputText
                        label={"Senha"}
                        name="pass"
                        type="password"
                      />
                    </Grid> */}
                    {/* "email": 
	"pass": 
	"active": 
         "profile_id" */}
                    {!!!location?.state && (
                      <Grid item xs={8}>
                        <RegisterInputText label={"E-mail"} name="email" />
                      </Grid>
                    )}
                    {!!!location?.state && (
                      <Grid item xs={4}>
                        <RegisterInputText label={"Gênero"} name="genre" />
                      </Grid>
                    )}

                    {/* <Grid item xs={4}>
                      <RegisterInputText label={"Plano"} name="plan_id" />
                    </Grid> */}

                    <Grid item xs={4}>
                      <RegisterSelect
                        label={"Perfil"}
                        name="profileId"
                        options={[
                          "Administrador",
                          "Dentista",
                          "Atendente",
                          "Cliente",
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    id="speeding-filter-period-save-button"
                    className="report-save-button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={loginCreateLoading || editUserLoading}
                    onClick={submitForm}
                  >
                    {loginCreateLoading || editUserLoading ? (
                      <CircularProgress
                        style={{ height: 14, width: 14, marginRight: 8 }}
                        color={"#fff"}
                      />
                    ) : (
                      <SaveIcon />
                    )}
                    Cadastrar
                  </Button>
                </Form>
              );
            }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default withRouter(ProfessionalForm);
