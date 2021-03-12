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
  const userPhoto = useSelector((state) => state.user?.userPhoto);
  const editUserLoading = useSelector(
    (state) => state.app?.loading?.editUserLoading
  );
  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  let user = {
    name: "Teste ds",
    birthday: null,
    genre: "M",
    rg: null,
    cpf: null,
    // picture: null,
    phone_mobile: null,
    phone_other: null,
  };
  // console.log("userDataProfile ->", userDataProfile);
  if (userDataProfile) {
    user = userDataProfile;
  }
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
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Formik
            initialValues={{ ...user }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              values.picture = userPhoto;
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

                      dispatch(
                        userAction.getDataProfile(
                          getToken(),
                          "dataUserLoading",
                          (error) => {
                            if (error) {
                              Utils.showError(error);
                              return;
                            }

                            // Redireciona para a tela HOME com as permissões
                          }
                        )
                      );
                      // setTimeout(function () {
                      //   props.comeback();
                      // }, 3000);

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
              // dispatch(
              //   loginAction.createAccount(
              //     values,
              //     "loginCreateLoading",
              //     (error) => {
              //       setSubmitting(false);
              //       if (error) {
              //         Utils.showError(error);
              //         return;
              //       }
              //       // console.log("ENTROU NO CALLBACK");
              //       Utils.showToast({
              //         type: "success",
              //         description: "Usuário cadastrado com sucesso",
              //       });
              //     }
              //   )
              // );
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
                      <RegisterInputText label={"RG"} name="rg" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"CPF"} name="cpf" />
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

                  <Box display="flex" justifyContent="flex-end" p={2}>
                    <Button
                      id="speeding-filter-period-save-button"
                      className="report-save-button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disableElevation
                      // disabled={loginCreateLoading}
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
