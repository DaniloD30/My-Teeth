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
import appointmentTypeAction from "~/actions/appointmentTypeAction";
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
const RegisteredAppointmentType = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const appointmentsType = useSelector(
    (state) => state.appointmentType?.appointmentsType
  );
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const appointmentTypeLoading = useSelector(
    (state) => state.app?.loading?.appointmentTypeLoading
  );

  const deleteAppointmentTypeLoading = useSelector(
    (state) => state.app?.loading?.deleteAppointmentTypeLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(
          appointmentTypeAction.getAllAppointmentsType(
            getToken(),
            "appointmentTypeLoading",
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
      } else {
        Utils.showError("Não autenticado!");
        setTimeout(function () {
          history.push("/login");
        }, 3000);
      }
    }
    setIsDelete(false);
  }, [dispatch, isDelete, history]);

  const SENT_COLUMNS = [
    {
      name: "description",
      label: "Descrição",
      render: (description) => <strong>{description}</strong>,
    },
    {
      name: "value",
      label: "Valor",
      render: (value) => <span>{value}</span>,
    },
  ];

  const openForm = () => {
    history.push("/register/appointmentsTypeInsert");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteClinicLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        appointmentTypeAction.getAllAppointmentsType(
          getToken(),
          "appointmentTypeLoading",
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
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, history]);

  const edit = (id, row) => {
    history.push(
      {
        pathname: `/register/appointmentsTypeInsert/${id}`,
      },
      row
    );
  };

  const handleDelete = (row) => {
    setIdRowDelete(row?.id);
    setFlagModal(true);
  };

  const confirmDeleteRow = () => {
    if (isAuthenticated()) {
      dispatch(
        appointmentTypeAction.deleteAppointmentType(
          getToken(),
          IdrowDelete,
          "deleteAppointmentTypeLoading",
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
              description: "Tipo de consulta deletada com sucesso",
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
                      Adicionar tipo de Consulta
                    </Button>
                  </Box>
                </div>
                {appointmentTypeLoading || deleteAppointmentTypeLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : appointmentsType?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhum tipo de consulta encontrado!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={appointmentsType}
                    edit={edit}
                    del={handleDelete}
                    excluir={true}
                    editar={true}
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
export default withRouter(RegisteredAppointmentType);
