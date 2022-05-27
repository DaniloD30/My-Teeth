import React, { useEffect } from "react";
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
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
import { isAuthenticated, getToken } from "~/services/auth";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import pt from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns"
import RegisterMaskedTextInput from "~/components/common/registerInputs/RegisterMaskedTextInput";
// import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
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

  const cities = useSelector((state) => state.user?.cities);

  const states = useSelector((state) => state.user?.states);

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // console.log("userDataProfile ->", userDataProfile);

  useEffect(() => {
    console.log("userDataAddress ->", userDataAddress);
    console.log("userDataProfile ->", userDataProfile);
  }, [userDataAddress, userDataProfile]);

  let user = {
    name: userDataProfile?.name,
    birthday: new Date(userDataProfile?.birthday),
    genre: userDataProfile?.genre,
    rg: userDataProfile?.rg,
    cpf: userDataProfile?.cpf,
    picture: userDataProfile?.picture,
    phone_mobile: userDataProfile?.phone_mobile,
    phone_other: userDataProfile?.phone_other,
    // addres: {
    //   id: null,
    //   address: "Rua carlos conceição, 161 testeee",
    //   number: "14",
    //   complement: "Villa Bella",
    //   district: "Buraquinho",
    //   zip_code: "",
    //   state_id: 4,
    //   citie_id: 0,
    //   person_id: localStorage.getItem("userid"),
    // },
    id: userDataAddress?.id,
    address: userDataAddress?.address,
    number: userDataAddress?.number,
    complement: userDataAddress?.complement,
    district: userDataAddress?.district,
    zip_code: userDataAddress?.zip_code,
    state_id: userDataAddress?.state_id,
    citie_id: userDataAddress?.citie_id,
    person_id: localStorage.getItem("userid"),
  };
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
              let errors = {};
              // console.log("values.cpf ->", values.cpf)
              // console.log(
              //   "Utils.isCpf(values.cpf) ->",
              //   Utils.isCpf(values.cpf)
              // );
              // if (!Utils.isCpf(values.cpf)) {
              //   errors.cpf = "CPF Inválido";
              // }
              // if (values.citie_id === 0) {
              //   errors.citie_id = "Campo Obrigatório";
              // }
              // if (values.state_id === 0) {
              //   errors.state_id = "Campo Obrigatório";
              // }
              //  console.log("zip_code ->", values.addres.zip_code)
              // if (!Utils.ValidaCep(values.zip_code)) {
              //   errors.zip_code = "CPF Inválido";
              // }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              values.birthday = format(new Date(values.birthday), 'yyyy-MM-dd')
              console.log("value birthday -->", values.birthday)
              if (userPhoto !== "") {
                values.picture = userPhoto;
              }
              let objAdress = {
                id: values.id,
                address: values.address,
                number: values.number,
                complement: values.complement,
                district: values.district,
                zip_code: values.zip_code,
                state_id: values.state_id,
                citie_id: values.citie_id,
                person_id: localStorage.getItem("userid"),
              };

              let objProfile = {
                another_that_indicated: null,
                birthday: values.birthday,
                cpf: values.cpf,
                education: null,
                family_income: null,
                genre: values.genre,
                marital_status: null,
                name: values.name,
                number_of_family_members_in_the_residence: null,
                phone_mobile: values.phone_mobile,
                phone_other: values.phone_other,
                picture: null,
                profession: null,
                race: null,
                rg: values.rg,
                type_of_housing: null,
                who_indicated: null
              }
              if (isAuthenticated()) {
                dispatch(
                  userAction.editProfile(
                    objProfile,
                    getToken(),
                    "editUserLoading",
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
                        description: "Usuário editado com sucesso!",
                      });

                      setTimeout(function () {
                        dispatch(
                          userAction.getDataProfile(
                            getToken(),
                            "dataUserLoading",
                            (error) => {
                              if (error) {
                                if (error === "Failed to authenticate token!") {
                                  Utils.showError("Não autenticado!");
                                  dispatch(loginAction.logoutUser());
                                  return;
                                }
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
                if (!!!user.id) {
                  console.log("entrou aqui ->", objAdress);
                  dispatch(
                    userAction.addAddress(
                      objAdress,
                      getToken(),
                      "addAdressLoading",
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
                      }
                    )
                  );
                } else {
                  // console.log("entrou aqui edit ->", userDataAddress)
                  dispatch(
                    userAction.editAddress(
                      objAdress,
                      getToken(),
                      "editAddressLoading",
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
            render={({ submitForm, setFieldValue, values }) => {
              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Nome"} name="name" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/* <RegisterInputText
                        label={"Data de Nascimento"}
                        name="birthday"
                      /> */}
                      <MuiPickersUtilsProvider locale={pt} utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          value={values.birthday}
                          onChange={(date) => setFieldValue('birthday', date)}
                          inputVariant="outlined"
                          name="birthday"
                          // minDate={dayjs(new Date(1999, 12, 31))}
                          minDateMessage="Data inválida"
                          // maxDateMessage="Os dados não devem ser posteriores à data final"
                          // maxDate={finalDateMemo}
                          // label="Data de Nascimento"
                          cancelLabel="Cancelar"
                          // format="DD/MM/YYYY"
                          format="dd/MM/yyyy"
                        />
                      </MuiPickersUtilsProvider>
                      {/* <RegisterMaskedTextInput
                        label={"Data de Nascimento"}
                        name="birthday"
                        mask="99/99/9999"
                      /> */}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Gênero"} name="genre" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"RG"}
                        name="rg"
                        mask="99.999.999-99"
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
                      {/* <RegisterInputText
                        label={"Celular"}
                        name="phone_mobile"
                      /> */}
                      <RegisterMaskedTextInput
                        label={"Celular"}
                        name="phone_mobile"
                        mask="(99) 99999-9999"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"Celular outro"}
                        name="phone_other"
                        mask="(99) 99999-9999"
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
                        label={"Endereço"}
                        name="address"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Número"}
                        name="number"
                        maxL="20"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Complemento"}
                        name="complement"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Distrito"}
                        name="district"
                        maxL="255"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterMaskedTextInput
                        label={"CEP"}
                        name="zip_code"
                        mask="99.999-999"
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Picture"} name="picture" />
                    </Grid>state_id: 1,
    citie_id: 1,
    person_id: 1, */}
                    <Grid item md={6} xs={12}>
                      {/* <RegisterInputText
                        label={"state_id"}
                        name="addres.state_id"
                        maxL="20"
                      /> */}
                      <RegisterSelect
                        label={"Estado"}
                        name="state_id"
                        options={states}
                        type="scheduler"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {/* <RegisterInputText
                        label={"citie_id"}
                        name="addres.citie_id"
                        maxL="20"
                      /> */}
                      <RegisterSelect
                        label={"Cidade"}
                        name="citie_id"
                        options={cities}
                        type="scheduler"
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
