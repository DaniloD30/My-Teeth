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
import userAction from "~/actions/userAction";
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
const RegisteredPacients = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const pacient = useSelector((state) => state.user?.cliente);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);
  const [data, setData] = React.useState();

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

  const deleteAppointmentTypeLoading = useSelector(
    (state) => state.app?.loading?.deleteAppointmentTypeLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(
          userAction.getAllDataProfile(
            getToken(),
            "dataAllUserLoading",
            (error) => {
              if (error) {
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
      name: "name",
      label: "Nome",
      render: (name) => <strong>{name}</strong>,
    },
    {
      name: "cpf",
      label: "Cpf",
      render: (cpf) => <span>{cpf}</span>,
    },
    {
      name: "phone_mobile",
      label: "Celular",
      render: (phone_mobile) => <span>{phone_mobile}</span>,
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
        userAction.getAllDataProfile(
          getToken(),
          "dataAllUserLoading",
          (error) => {
            if (error) {
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

  useEffect(() => {
    if (pacient) {
      let arrayPerson = [];
      pacient.forEach((item) => {
        arrayPerson.push(item?.person);
      });

      setData(arrayPerson);
    }
  }, [pacient]);

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

  const handleDetail = (row) => {
    history.push(
      {
        pathname: `/pacients/details`,
      },
      row
    );
  };
  
  const confirmDeleteRow = () => {
    if (isAuthenticated()) {
      // dispatch(
      //   appointmentTypeAction.deleteAppointmentType(
      //     getToken(),
      //     IdrowDelete,
      //     "deleteAppointmentTypeLoading",
      //     (error) => {
      //       if (error) {
      //         Utils.showError(error);
      //         return;
      //       }
      //       Utils.showToast({
      //         type: "success",
      //         description: "Tipo de consulta deletada com sucesso",
      //       });
      //       setTimeout(function () {
      //         setIsDelete(true);
      //       }, 3000);
      //       // props.comeback();
      //     }
      //   )
      // );
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
                      Adicionar Paciente
                    </Button>
                  </Box>
                </div>
                {dataAllUserLoading || deleteAppointmentTypeLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : pacient?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhum paciente encontrado!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={data}
                    edit={edit}
                    del={handleDelete}
                    handleD={handleDetail}
                    detail={true}
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
      </Page>
    </>
  );
};
export default withRouter(RegisteredPacients);
