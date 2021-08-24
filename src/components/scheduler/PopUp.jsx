import { Box, Dialog, Button, Grid, CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import React, { useEffect } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { isAuthenticated, getToken } from "~/services/auth";
import { useDispatch, useSelector } from "react-redux";
import Utils from "~/helpers/Utils";
import appointmentAction from "~/actions/appointmentAction";
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
import { Formik, Form } from "formik";
import DeleteIcon from "@material-ui/icons/Delete";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import pt from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import loginAction from "~/actions/loginAction";
const PopUp = ({
  flagOpen,
  handleClose,
  dentista,
  pacientes,
  departmentData,
  dataArg,
  flagEdit,
}) => {
  // dataArg é o nome do objeto que vem com os dados da consulta para edição

  const appointmentsType = useSelector(
    (state) => state.appointmentType?.appointmentsType
  );

  const appointmentStatus = useSelector(
    (state) => state.appointmentStatus?.appointmentsStatus
  );

  const addAppointmentLoading = useSelector(
    (state) => state.app?.loading?.addAppointmentLoading
  );

  const editAppointmentLoading = useSelector(
    (state) => state.app?.loading?.editAppointmentLoading
  );

  const DeleteAppointmentLoading = useSelector(
    (state) => state.app?.loading?.DeleteAppointmentLoading
  );
  const dispatch = useDispatch();
  // const [flagEdit, setFlagEdit] = useState(false);
  let history = useHistory();
  // const [department, setDepartment] = useState([]);
  // console.log("props d -->", departmentData);
  // console.log("status ->", dataArg?.event)

  useEffect(() => {
    if (appointmentsType?.length > 0) {
      appointmentsType.map((item) => (item.Text = item?.description));
    }
  }, [appointmentsType]);

  useEffect(() => {
    if (appointmentStatus?.length > 0) {
      appointmentStatus.map((item) => (item.Text = item?.status));
    }
  }, [appointmentStatus]);

  let user = {
    note: "" || dataArg?.event?.note,
    appointmentsType_id: null || dataArg?.event?.appointmentsType_id,
    userdentist_id: null || dataArg?.event?.userdentist_id,
    userpatient_id: null || dataArg?.event?.userpatient_id,
    appointmentsStatus_id: null || dataArg?.event?.appointmentsStatus_id,
    clinic_id: localStorage.getItem("clinic_id"), // localStorage
    // DepartmentID: null, // por enquanto estou adicionando o departamento no useEffect do getAppointment
    userregistered_id: null, // localStorage
    StartTime: dataArg?.startTime || dataArg?.event?.StartTime, // no editar é a mesma data que vem do banco
    EndTime: dataArg?.endTime || dataArg?.event?.EndTime,
    // picture: null,
    // phone_mobile: null,
    // phone_other: null,

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

  const deletEvent = () => {
    if (isAuthenticated()) {
      dispatch(
        appointmentAction.deleteAppointment(
          getToken(),
          dataArg?.event?.id,
          "DeleteAppointmentLoading",
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

            Utils.showToast({
              type: "success",
              description: "Consulta deletada com sucesso!",
            });
            setTimeout(function () {
              dispatch(
                appointmentAction.getAllAppointments(
                  getToken(),
                  "dataAppointmentsLoading",
                  false,
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
              handleClose();
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
  };
  // Clinic_id, essa parte tem que ser conversada, pq se um paciente estiver relacionado com mais de uma clínica.
  return (
    <>
      <ToastContainer />
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
              if (!values.note) {
                errors.note = "Nota Obrigatória";
              }
              if (!values.userdentist_id) {
                errors.userdentist_id = "Selecione um dentista";
              }
              if (!values.userpatient_id) {
                errors.userpatient_id = "Selecione um paciente";
              }
              // if (!values.appointmentsStatus_id) {
              //   errors.appointmentsStatus_id = "Selecione um Status";
              // }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              values.userregistered_id = localStorage.getItem("userid");
              // values.appointmentsStatus_id = 2
              if (flagEdit) {
                if (isAuthenticated()) {
                  dispatch(
                    appointmentAction.editAppointment(
                      values,
                      getToken(),
                      dataArg?.event?.id,
                      "editAppointmentLoading",
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
                          description: "Consulta editada com sucesso!",
                        });
                        setTimeout(function () {
                          dispatch(
                            appointmentAction.getAllAppointments(
                              getToken(),
                              "dataAppointmentsLoading",
                              false,
                              (error) => {
                                if (error) {
                                  if (
                                    error === "Failed to authenticate token!"
                                  ) {
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
                          handleClose();
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
              } else {
                if (isAuthenticated()) {
                  dispatch(
                    appointmentAction.addAppointment(
                      values,
                      getToken(),

                      "addAppointmentLoading",
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
                          description: "Consulta cadastrada com sucesso!",
                        });

                        setTimeout(function () {
                          dispatch(
                            appointmentAction.getAllAppointments(
                              getToken(),
                              "dataAppointmentsLoading",
                              false,
                              (error) => {
                                if (error) {
                                  if (
                                    error === "Failed to authenticate token!"
                                  ) {
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
                          handleClose();
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
              }
            }}
            render={({ submitForm, setFieldValue, values }) => {
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
                        label={"Status"}
                        name="appointmentsStatus_id"
                        options={appointmentStatus}
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
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
                        <DateTimePicker
                          label="Data Inicial"
                          inputVariant="outlined"
                          name="StartTime"
                          format="MM/dd/yyyy - HH:mm"
                          // value={selectedDate}
                          value={values.StartTime}
                          onChange={(value) =>
                            setFieldValue("StartTime", value)
                          }
                          // onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
                        <DateTimePicker
                          label="Data Final"
                          inputVariant="outlined"
                          name="EndTime"
                          format="MM/dd/yyyy - HH:mm"
                          // value={selectedDate}
                          value={values.EndTime}
                          onChange={(value) => setFieldValue("EndTime", value)}
                          // onChange={handleDateChange}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                      <RegisterSelect
                        label={"Departamento"}
                        name="DepartmentID"
                        options={departmentData}
                        type="department"
                      />
                    </Grid> */}
                    {/* <Grid item md={6} xs={12}>
                      <RegisterInputText
                        label={"Celular outro"}
                        name="phone_other"
                      />
                    </Grid> */}
                  </Grid>

                  <Box display="flex" justifyContent="flex-end">
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        {flagEdit ? (
                          <Button
                            id="speeding-filter-period-save-button"
                            style={{ backgroundColor: "#ff5858" }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            disableElevation
                            disabled={DeleteAppointmentLoading}
                            onClick={deletEvent}
                          >
                            {DeleteAppointmentLoading ? (
                              <CircularProgress
                                style={{
                                  height: 14,
                                  width: 14,
                                  marginRight: 8,
                                }}
                                color={"#fff"}
                              />
                            ) : (
                              <DeleteIcon />
                            )}
                            Apagar Consulta
                          </Button>
                        ) : null}
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <Button
                          id="speeding-filter-period-save-button"
                          className="report-save-button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disableElevation
                          disabled={addAppointmentLoading || editAppointmentLoading}
                          onClick={submitForm}
                        >
                          {addAppointmentLoading || editAppointmentLoading ? (
                            <CircularProgress
                              style={{ height: 14, width: 14, marginRight: 8 }}
                              color={"#fff"}
                            />
                          ) : (
                            <SaveIcon />
                          )}
                          {flagEdit ? "Editar" : "Salvar"}
                        </Button>
                      </Grid>
                    </Grid>
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

export default withRouter(PopUp);
