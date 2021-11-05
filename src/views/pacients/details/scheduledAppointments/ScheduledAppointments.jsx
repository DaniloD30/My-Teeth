import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@material-ui/core";
// import profileAction from "../../../actions/profileAction";
// import clinicTypeAction from "~/actions/clinicTypeAction";
import appointmentAction from "~/actions/appointmentAction";
import { isAuthenticated, getToken } from "~/services/auth";
// import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
const ScheduledAppointments = (props) => {
  const { history, statePacient } = props;
  const dispatch = useDispatch();
  const appointmentByIdPacient = useSelector(
    (state) => state.appointment?.appointmentByIdPacient
  );
  // const [data, setData] = React.useState();
  // const [IdrowDelete, setIdRowDelete] = React.useState();
  // const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const getAppointmentPacientLoading = useSelector(
    (state) => state.app?.loading?.getAppointmentPacientLoading
  );

  // const deleteClinicTypeLoading = useSelector(
  //   (state) => state.app?.loading?.deleteClinicTypeLoading
  // );

  // useEffect(() => {
  //   if (isDelete) {
  //     if (isAuthenticated()) {
  //       dispatch(
  //         clinicTypeAction.getAllAppointmentsPacients(
  //           getToken(),
  //           "getClinicsTypeLoading"
  //         )
  //       );
  //     } else {
  //       Utils.showError("Não autenticado!");
  //       setTimeout(function () {
  //         history.push("/login");
  //       }, 3000);
  //     }
  //   }
  //   setIsDelete(false);
  // }, [dispatch, isDelete, history]);
  // "description": "Qualquer coisa",
  //     "active": true,
  const SENT_COLUMNS = [
    {
      name: "note",
      label: "Nota",
      render: (nota) => <span>{nota}</span>,
    },
    {
      name: "day",
      label: "Data",
      render: (data) => <strong>{data}</strong>,
    },
    {
      name: "hour",
      label: "Horário",
      render: (data) => <strong>{data}</strong>,
    },
    {
      name: "statusName",
      label: "Status",
      render: (data) => <strong>{data}</strong>,
    },
    {
      name: "clinicName",
      label: "Clínica",
      render: (clinic) => <strong>{clinic}</strong>,
    },
    {
      name: "dentistName",
      label: "Dentista",
      render: (dentista) => <span>{dentista}</span>,
    },
  ];

  const openForm = () => {
    history.push("/register/clinicTypeInsert");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteClinicTypeLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        appointmentAction.getAllAppointmentsPacients(
          getToken(),
          statePacient?.id,
          "getAppointmentPacientLoading",
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
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, history, statePacient?.id]);

  // const edit = (id, row) => {
  //   history.push(
  //     {
  //       pathname: `/register/clinicTypeInsert/${id}`,
  //     },
  //     row
  //   );
  // };

  // const handleDelete = (row) => {
  //   setIdRowDelete(row?.id);
  //   setFlagModal(true);
  // };

  const confirmDeleteRow = () => {
    // if (isAuthenticated()) {
    //   dispatch(
    //     clinicTypeAction.deleteClinicType(
    //       getToken(),
    //       IdrowDelete,
    //       "deleteClinicTypeLoading",
    //       (error) => {
    //         if (error) {
    //           Utils.showError(error);
    //           return;
    //         }

    //         Utils.showToast({
    //           type: "success",
    //           description: "Tipo de Clínica deletada com sucesso",
    //         });

    //         setTimeout(function () {
    //           setIsDelete(true);
    //         }, 3000);

    //         // props.comeback();
    //       }
    //     )
    //   );
    // } else {
    //   Utils.showError("Não autenticado!");
    //   setTimeout(function () {
    //     history.push("/login");
    //   }, 3000);
    // }

    // dispatch(pointsInterestAction.pointsInterestDelete(IdrowDelete, refreshList));
    setFlagModal(false);
  };

  const handleCloseModal = () => {
    setFlagModal(false);
  };

  return (
    <>
      {/* <Page> */}
      <main>
        <Container
        // maxWidth="lg"
        // className="container-map-view register-driver-view"
        >
          <Grid container>
            <Grid item xs={12}>
              <div style={{ marginBottom: "40px", display: "flex" }}>
                <Box>
                  <Button
                    id="add-button-driver"
                    className="report-save-button"
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={openForm}
                  >
                    {/* <AddIcon /> */}
                    <img
                      alt="addIcon"
                      src={AddIcon}
                      style={{ height: "auto", width: 20, padding: 3 }}
                    />
                    Solicitar nova consulta//Solicitar Reagendamento//Solicitar Cancelamento
                  </Button>
                </Box>
              </div>
              {getAppointmentPacientLoading ? (
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : appointmentByIdPacient?.length < 1 ? (
                <Typography variant="h3" style={{ textAlign: "center" }}>
                  Nenhuma consulta agendada!
                </Typography>
              ) : (
                <Table
                  columns={SENT_COLUMNS}
                  dataSource={appointmentByIdPacient}
                  // edit={edit}
                  // del={handleDelete}
                  excluir={false}
                  editar={false}
                />
              )}
              <Box
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "flex-end",
                  marginTop: "15px",
                }}
              >
                <Pagination onChange={handlePage} count={10} />
              </Box>
              <ModalCommon
                title={"Confirma Exclusão do registro selecionado?"}
                confirmDelete={confirmDeleteRow}
                handleClose={handleCloseModal}
                flag={modal}
              />
              <ToastContainer />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* </Page> */}
    </>
  );
};
export default withRouter(ScheduledAppointments);
