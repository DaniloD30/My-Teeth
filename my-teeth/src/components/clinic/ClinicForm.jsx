import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Card from "~/components/common/expansionCard/Card";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
// import Utils from "~/helpers/Utils";
// import { useTranslation } from "react-i18next";
// import Utils from "~/helpers/Utils";
import UserIcon from "~/assets/icons/user.svg";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
import RegisterCheckbox from "~/components/common/registerInputs/RegisterCheckbox";
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
// import CpfCnpjUtils from "~/helpers/CpfCnpjUtils";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
// import RegisterImageInput from "~/components/common/registerInputs/RegisterImageInput";
// import driverAction from "~/actions/driverAction";
import RegisterImageInput from "../../components/common/registerInputs/RegisterImageInput"
const ClinicForm = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { location } = history;
  // const { t } = useTranslation();
  // const { loading } = useSelector((state) => state.app);
  const getProfilesLoading = useSelector(
    (state) => state.app?.loading?.getProfilesLoading
  );
  const addUsersLoading = useSelector(
    (state) => state.app?.loading?.addUsersLoading
  );

  const editUsersLoading = useSelector(
    (state) => state.app?.loading?.editUsersLoading
  );

  const getResourceLoading = useSelector(
    (state) => state.app?.loading?.getResourceLoading
  );
  const [perfil, setPerfil] = React.useState([]);
  const [
    recursosIndividualizados,
    setRecursosIndividualizados,
  ] = React.useState([]);

  let user = {
    usuario: "",
    nome: "",
    sobrenome: "",
    matricula: "",
    cpf: "",
    email: "",
    fixo: "",
    celular: "",
    celularTipo: null,
    foto: null,
    idTipoUsuario: 1,
    administrador: false,
    motivoInativacao: "",
    ativo: true,
    idUsuarioCriacao: 1,
    dataCriacao: "2020-12-14T17:05:36.075Z",
    idUsuarioAtualizacao: 1,
    dataAtualizacao: "2020-12-14T17:05:36.075Z",
    Enderecos: [],
    Perfis: null,
    Recursos: null,
    tenantId: "tpc",
  };

  if (location?.state) {
    user = {
      ...user,
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

  const handleChange = (arr, type) => {
    if (type === "recursosIndividualizados") {
      setRecursosIndividualizados(arr);
    } else {
      setPerfil(arr);
    }
  };

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
              ...user,
            }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // if (values?.foto?.base64) {
              //   let y = Utils.stringBase64ToObjectBase64(values.foto.base64);
              //   values.foto = Utils.b64toBlob(y.data);
              // }
              // console.log("values ->", values)
              // if (values?.foto?.base64) {
              //   let x = Utils.stringBase64ToObjectBase64(values.foto.base64)
              //   let y = Utils.base64ToArrayBuffer(x.data);
              //   console.log(" y ->", y)
              // values.foto = Utils.b64toBlob(y.data);
              // }
              // console.log("y ->", y)
              // let x = atob(y.data)
              // console.log("x ->", x)aa
              values.perfis = perfil;
              values.recursosPermissoes = recursosIndividualizados;

              // editUsersLoading
              if (location?.state) {
                // dispatch(
                //   userAction.editUser(
                //     values,
                //     location?.state?.idUsuario,
                //     "editUsersLoading",
                //     (error) => {
                //       setSubmitting(false);
                //       if (error) {
                //         Utils.showError(error);
                //         return;
                //       }
                //       Utils.showToast({
                //         type: "success",
                //         description: "Usuário editado com sucesso",
                //       });
                //       props.comeback();
                //     }
                //   )
                // );
                /*
                dispatch de edição usuario
                */
              } else {
                // dispatch(
                //   userAction.addUser(values, "addUsersLoading", (error) => {
                //     setSubmitting(false);
                //     if (error) {
                //       Utils.showError(error);
                //       return;
                //     }
                //     Utils.showToast({
                //       type: "success",
                //       description: "Usuário salvo com sucesso",
                //     });
                //     props.comeback();
                //   })
                // );
              }

              // dispatch(
              //   driverAction.saveDriver(newDriver, (error) => {
              //     setSubmitting(false);
              //     if (error) {
              //       Utils.showError(error);
              //       return;
              //     }

              //     Utils.showTranslatedToast({
              //       type: Constants.SUCCESS,
              //       description: Labels.REGISTER_DRIVER_FORM_MSG_SUCCESS,
              //     });

              //     props.comeback();
              //   })
              // );
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
                      {location?.state ? null : (
                        <RegisterInputText label={"E-mail"} name="email" />
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <RegisterImageInput
                        name={"foto"}
                        placholderIcon={
                          <img src={UserIcon} alt={"Icon Close"} {...props} />
                        }
                        accept=".jpg, .png, .jpeg"
                      />
                    </Grid>
                  </Grid>

                  <Box
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box style={{ width: "400px" }}>
                      {location?.state ? null : (
                        <RegisterInputText label={"Usuário"} name="usuario" />
                      )}
                    </Box>
                    <Box style={{ marginLeft: "20px" }}>
                      <RegisterCheckbox
                        // label={"ativo"}
                        name="idTipoUsuario"
                        size="medium"
                        color="primary"
                        labelLegend={"Interno"}
                      />
                    </Box>
                    <Box>
                      <RegisterCheckbox
                        name="administrador"
                        size="medium"
                        color="primary"
                        labelLegend={"Admnistrador"}
                      />
                    </Box>
                    <Box>
                      <RegisterCheckbox
                        name="ativo"
                        size="medium"
                        color="primary"
                        labelLegend={"Ativo"}
                      />
                    </Box>
                  </Box>

                  <Grid item xs={10}>
                    <Grid item xs={12} md={8}>
                      <RegisterInputText label={"Nome"} name="nome" />
                    </Grid>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid item xs={12} md={8}>
                      <RegisterInputText label={"Sobrenome"} name="sobrenome" />
                    </Grid>
                  </Grid>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={2}>
                      <RegisterInputText label={"Matrícula"} name="matricula" />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <RegisterMaskedTextInput
                        label={"CPF"}
                        name="cpf"
                        mask="999.999.999-99"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={2}>
                      <RegisterMaskedTextInput
                        label={"Telefone"}
                        name="fixo"
                        mask="(99) 99999-9999"
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <RegisterMaskedTextInput
                        label={"Celular"}
                        name="celular"
                        mask="(99) 99999-9999"
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <RegisterSelect
                        label={"Tipo Celular"}
                        name="celularTipo"
                        options={["Fixo"]}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                      <Box id="addres" style={{ marginTop: "10px" }}>
                        <Typography>Endereço</Typography>
                        <Paper>
                          <Grid container spacing={4}>
                            <Grid item xs={12} md={3}>
                              <RegisterMaskedTextInput
                                label={"CEP"}
                                name="Enderecos[0].cep"
                                mask="99.999-999"
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <RegisterInputText
                                label={"PAÍS"}
                                name="Enderecos.pais"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                              <RegisterInputText
                                label={"Logradouro"}
                                name="Enderecos[0].logradouro"
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <RegisterInputText
                                label={"Número"}
                                name="Enderecos[0].numero"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={4}>
                            <Grid item xs={12} md={5}>
                              <RegisterInputText
                                label={"Complemento"}
                                name="Enderecos[0].complemento"
                              />
                            </Grid>

                            <Grid item xs={12} md={5}>
                              <RegisterInputText
                                label={"Bairro"}
                                name="Enderecos[0].bairro"
                              />
                            </Grid>
                          </Grid>

                          <Grid container spacing={4}>
                            <Grid item xs={12} md={5}>
                              <RegisterInputText
                                label={"Cidade"}
                                name="Enderecos[0].cidade"
                              />
                            </Grid>

                            <Grid item xs={12} md={5}>
                              <RegisterInputText
                                label={"UF"}
                                name="Enderecos[0].uf"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>
                    </Grid>

                    {/* <Grid item xs={12} md={2}></Grid> */}
                  </Grid>

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
                          disabled={addUsersLoading || editUsersLoading}
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

export default ClinicForm;
