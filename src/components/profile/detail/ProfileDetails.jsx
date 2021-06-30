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
import userAction from "~/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, getToken } from "~/services/auth";
import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import Utils from "~/helpers/Utils";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ className, props, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [dataAdress, setDataAdress] = useState([]);

  // let history = useHistory();
  // const [values, setValues] = useState({
  //   firstName: "Katarina",
  //   lastName: "Smith",
  //   email: "demo@devias.io",
  //   phone: "",
  //   state: "Alabama",
  //   country: "USA",
  // });
  const userDataProfile = useSelector((state) => state.user?.userDataProfile);
  // const [user, setData] = useState(userDataProfile);

  const userDataAddress = useSelector((state) => state.user?.address);
  const userPhoto = useSelector((state) => state.user?.userPhoto);
  const editUserLoading = useSelector(
    (state) => state.app?.loading?.editUserLoading
  );
  const addAdressLoading = useSelector(
    (state) => state.app?.loading?.addAdressLoading
  );
  const editAddressLoading = useSelector(
    (state) => state.app?.loading?.editAddressLoading
  );

  let user = {
    name: "Teste ds",
    birthday: null,
    genre: "M",
    rg: null,
    cpf: null,
    // picture: null,
    phone_mobile: null,
    phone_other: null,
    addres: {
      id: null,
      address: "Rua carlos conceição, 161 testeee",
      number: "14",
      complement: "Villa Bella",
      district: "Buraquinho",
      zip_code: "42710120",
      state_id: 4,
      citie_id: 4,
      person_id: localStorage.getItem("userid"),
    },
  };
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // console.log("userDataProfile ->", userDataProfile);

  if (userDataProfile) {
    // setData(userDataProfile)
    user = userDataProfile;
  }
  if (userDataAddress) {
    // console.log("userDataAddress", userDataAddress);
    user.addres = userDataAddress;
  }

  // useEffect(() => {
  // console.log("userDataProfile", userDataProfile)
  // setData(userDataProfile);
  // if (userDataAddress.length > 0) {
  // setData(userDataAddress)
  // console.log("userDataAddress", userDataAddress);
  // user.addres = userDataAddress;
  //   }
  // }, [userDataAddress]);

  // useEffect(() => {
  // console.log("userDataProfile", userDataProfile)
  // setData(userDataProfile);
  //  console.log("user", user)
  // }, [user]);
  // "name": "Teste",
  //   "birthday": null,
  //   "genre": "M",
  //   "rg": null,
  //   "cpf": null,
  //   "picture": null,
  //   "phone_mobile": null,
  //   "phone_other": null,
  return (
    <form autoComplete="off" noValidate className={classes.root} {...rest}>
      <ToastContainer />
      <Card>
        <CardHeader subheader="A informação pode ser editada" title="Perfil" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{ ...user }}
            validate={(values) => {
              const errors = {};

              // if (!values.addres.zip_code) {
              //   errors.addres.zip_code = "CEP Obrigatório";
              // } else if (!Utils.isCEP(values.addres.zip_code)) {
              //   errors.addres.zip_code = "CEP Inválido";
              // }
              // if (!values.cpf) {
              //   errors.cpf = "Cpf Obrigatório";
              // } else if (!Utils.isCpf(values.cpf)) {
              //   errors.cpf = "CPF Inválido";
              // }
              //CPF RG
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (userPhoto !== "") {
                values.picture = userPhoto;
              }
              if (isAuthenticated()) {
                dispatch(
                  userAction.editProfile(
                    values,
                    getToken(),
                    "editUserLoading",
                    (error) => {
                      setSubmitting(false);

                      if (error) {
                        Utils.showError(error);
                        return;
                      }

                      Utils.showToast({
                        type: "success",
                        description: "Usuário editado com sucesso!",
                      });

                      setTimeout(function () {
                        dispatch(
                          userAction.getDataProfile(
                            getToken(),
                            "dataUserLoading",
                            (error) => {
                              if (error) {
                                Utils.showError(error);
                                return;
                              }
                            }
                          )
                        );
                      }, 2000);

                      // props.comeback();
                    }
                  )
                );
                if (userDataAddress.length < 0) {
                  dispatch(
                    userAction.addAddress(
                      values.addres,
                      getToken(),
                      "addAdressLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          Utils.showError(error);
                          return;
                        }

                        // setTimeout(function () {
                        //   dispatch(
                        //     userAction.getDataProfile(
                        //       getToken(),
                        //       "dataUserLoading",
                        //       (error) => {
                        //         if (error) {
                        //           Utils.showError(error);
                        //           return;
                        //         }
                        //       }
                        //     )
                        //   );
                        // }, 2000);

                        // props.comeback();
                      }
                    )
                  );
                } else {
                  dispatch(
                    userAction.editAddress(
                      values.addres,
                      getToken(),
                      "editAddressLoading",
                      (error) => {
                        setSubmitting(false);

                        if (error) {
                          Utils.showError(error);
                          return;
                        }

                        // setTimeout(function () {
                        //   dispatch(
                        //     userAction.getDataProfile(
                        //       getToken(),
                        //       "dataUserLoading",
                        //       (error) => {
                        //         if (error) {
                        //           Utils.showError(error);
                        //           return;
                        //         }
                        //       }
                        //     )
                        //   );
                        // }, 2000);

                        // props.comeback();
                      }
                    )
                  );
                }
                // ADD OR EDIT ADDRESS USER HERE
              } else {
                Utils.showError("Não autenticado!");
                setTimeout(function () {
                  props.history.push("/login");
                }, 3000);
              }
            }}
            render={({ submitForm, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Nome"} name="name" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Data de Nascimento"}
                        name="birthday"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Gênero"} name="genre" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"RG"}
                        name="rg"
                        mask="99.999.999-9"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"CPF"}
                        name="cpf"
                        mask="999.999.999-99"
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Picture"} name="picture" />
                    </Grid> */}
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Celular"}
                        name="phone_mobile"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Celular outro"}
                        name="phone_other"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <CardHeader
                        subheader="A informação pode ser editada"
                        title="Endereço"
                      />
                      <Divider />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Address"}
                        name="addres.address"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Número"}
                        name="addres.number"
                        maxL="20"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Complemento"}
                        name="addres.complement"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"Distrito"}
                        name="addres.district"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"CEP"}
                        name="addres.zip_code"
                        mask="99999-999"
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Picture"} name="picture" />
                    </Grid>state_id: 1,
    citie_id: 1,
    person_id: 1, */}
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"state_id"}
                        name="addres.state_id"
                        maxL="20"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"citie_id"}
                        name="addres.citie_id"
                        maxL="20"
                      />
                    </Grid>
                  </Grid>
                  {/* person_id */}
                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button
                      id="speeding-filter-period-save-button"
                      className="report-save-button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disableElevation
                      disabled={
                        editAddressLoading ||
                        editUserLoading ||
                        addAdressLoading
                      }
                      onClick={submitForm}
                    >
                      {editUserLoading ? (
                        <CircularProgress
                          style={{ height: 14, width: 14, marginRight: 8 }}
                          color={"#fff"}
                        />
                      ) : (
                        <SaveIcon />
                      )}
                      Atualizar
                    </Button>
                  </Box>
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

export default withRouter(ProfileDetails);
