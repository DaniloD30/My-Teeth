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
import clinicAction from "~/actions/clinicAction";
import appointmentAction from "~/actions/appointmentAction";
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
const RegisteredConsults = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const appointmentsByIdDentist = useSelector(
    (state) => state.appointment?.appointmentsByIdDentist
  );
  const profileData = useSelector((state) => state.login.profileId);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const getAppointmentsDentist = useSelector(
    (state) => state.app?.loading?.getAppointmentsDentist
  );
  const dataAppointmentsLoading = useSelector(
    (state) => state.app?.loading?.dataAppointmentsLoading
  );
  // const deleteClinicLoading = useSelector(
  //   (state) => state.app?.loading?.deleteClinicLoading
  // );
  const appointmentsData = useSelector(
    (state) => state.appointment?.appointmentsMyConsults
  );

  // useEffect(() => {
  //   if (isDelete) {
  //     if (isAuthenticated()) {
  //       dispatch(clinicAction.getAllClinics(getToken(), "getClinicsLoading"));
  //     } else {
  //       Utils.showError("Não autenticado!");
  //       setTimeout(function () {
  //         history.push("/login");
  //       }, 3000);
  //     }
  //   }
  //   setIsDelete(false);
  // }, [dispatch, isDelete, history]);

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
      name: "pacientName",
      label: "Paciente",
      render: (dentista) => <span>{dentista}</span>,
    },
  ];

  const openForm = () => {
    history.push("/scheduler");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteClinicLoading", value));
  };

  useEffect(() => {
    // Responsavel pelo GET APPOINTMENTS BY ID DENTISTA, Para isso preciso verificar se o usuário é dentista
    // Provavelmente terá uma regra para cada tipo de profile aqui... ex: "ADM": Irá vizualizar todas as consultas
    // "Dentista": apenas as consultas dele ... "Secretário": Todas as consultas, talvez filtrando ....

    if (isAuthenticated()) {
      if (profileData === 2) {
        dispatch(
          appointmentAction.getAllAppointmentsDentists(
            getToken(),
            localStorage.getItem("userid"),
            "getAppointmentsDentist",
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
        // console.log("entrou no get all")
        dispatch(
          appointmentAction.getAllAppointments(
            getToken(),
            "dataAppointmentsLoading",
            true,
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
      }
      // CONSULTAS REFERENTES AO DENTISTA
      // CRIAR UMA CONTA "DENTISTA" ...

      // }
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, history, profileData]);

  // const edit = (id, row) => {
  //   history.push(
  //     {
  //       pathname: `/register/clinicInsert/${id}`,
  //     },
  //     row
  //   );
  // };

  // const handleDelete = (row) => {
  //   setIdRowDelete(row?.id);
  //   setFlagModal(true);
  // };

  const confirmDeleteRow = () => {
    if (isAuthenticated()) {
      dispatch(
        clinicAction.deleteClinic(
          getToken(),
          IdrowDelete,
          "deleteClinicLoading",
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

            Utils.showToast({
              type: "success",
              description: "Clínica deletada com sucesso",
            });

            setTimeout(function () {
              setIsDelete(true);
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

    // dispatch(pointsInterestAction.pointsInterestDelete(IdrowDelete, refreshList));
    setFlagModal(false);
  };

  const handleCloseModal = () => {
    setFlagModal(false);
  };

  return (
    <>
      <Page>
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
                      Consultas
                    </Button>
                  </Box>
                </div>
                {getAppointmentsDentist || dataAppointmentsLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : appointmentsByIdDentist?.length < 1 &&
                  appointmentsData?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhuma consulta encontrada!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={
                      appointmentsByIdDentist?.length < 1
                        ? appointmentsData
                        : appointmentsByIdDentist
                    }
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
      </Page>
    </>
  );
};
export default withRouter(RegisteredConsults);