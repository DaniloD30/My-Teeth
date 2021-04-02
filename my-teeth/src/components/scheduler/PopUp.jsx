import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import React, { useEffect, useState } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import Utils from "~/helpers/Utils";
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
import { Formik, Form } from "formik";
const PopUp = ({
  flagOpen,
  handleClose,
  dentista,
  pacientes,
  departmentData,
}) => {
  const appointmentsType = useSelector(
    (state) => state.appointmentType?.appointmentsType
  );

  // const [department, setDepartment] = useState([]);
  // console.log("props d -->", departmentData);

  useEffect(() => {
    if (appointmentsType.length > 0) {
      appointmentsType.map((item) => {
        item.Text = item?.description;
      });
    }
  }, [appointmentsType]);

  let user = {
    name: "Teste ds",
    birthday: null,
    genre: "M",
    rg: null,
    cpf: null,
    // picture: null,
    phone_mobile: null,
    phone_other: null,

    // {
    //     "note": "Consulta de Triagem para inicio de tratamento", done
    //     "appointmentsType_id":4, done
    //     "userdentist_id":24, done
    //     "userpatient_id":14, done
    //     "DepartmentID": 1, done
    //     "userregistered_id":24, userID que ja esta no local storage
    //     "clinic_id":4, acho que vou pegar o da local storage
    //     "StartTime": "2020-07-13 17:00:00",
    //     "EndTime": "2020-07-13 18:00:00"
    // }
  };

  // Clinic_id, essa parte tem que ser conversada, pq se um paciente estiver relacionado com mais de uma clínica.
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={flagOpen}
      >
        <Box style={{ padding: "20px" }}>
          <Formik
            initialValues={{ ...user }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              // values.picture = userPhoto;
              // if (isAuthenticated()) {
              //   dispatch(
              //     userAction.editProfile(
              //       values,
              //       getToken(),
              //       "editUserLoading",
              //       (error) => {
              //         setSubmitting(false);
              //         if (error) {
              //           Utils.showError(error);
              //           return;
              //         }
              //         Utils.showToast({
              //           type: "success",
              //           description: "Usuário editado com sucesso!",
              //         });
              //         setTimeout(function () {
              //           dispatch(
              //             userAction.getDataProfile(
              //               getToken(),
              //               "dataUserLoading",
              //               (error) => {
              //                 if (error) {
              //                   Utils.showError(error);
              //                   return;
              //                 }
              //               }
              //             )
              //           );
              //         }, 2000);
              //         // props.comeback();
              //       }
              //     )
              //   );
              // } else {
              //   Utils.showError("Não autenticado!");
              //   setTimeout(function () {
              //     props.history.push("/login");
              //   }, 3000);
              // }
            }}
            render={({ submitForm, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <RegisterInputText label={"Nota"} name="note" />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterSelect
                        label={"Dentista"}
                        name="userdentist_id"
                        options={dentista}
                        type="scheduler"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <RegisterSelect
                        label={"Paciente"}
                        name="userpatient_id"
                        options={pacientes}
                        type="scheduler"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <RegisterSelect
                        label={"Tipo de Consulta"}
                        name="appointmentsType_id"
                        options={appointmentsType}
                        type="scheduler"
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <RegisterSelect
                        label={"Departamento"}
                        name="DepartmentID"
                        options={departmentData}
                        type="department"
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
                      {false ? (
                        <CircularProgress
                          style={{ height: 14, width: 14, marginRight: 8 }}
                          color={"#fff"}
                        />
                      ) : (
                        <SaveIcon />
                      )}
                      Salvar
                    </Button>
                  </Box>
                </Form>
              );
            }}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default PopUp;
