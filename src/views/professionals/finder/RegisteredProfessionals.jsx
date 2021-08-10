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
const RegisteredProfessionals = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const professionals = useSelector((state) => state.user?.profissionais);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

  const deleteProcedureLoading = useSelector(
    (state) => state.app?.loading?.deleteProcedureLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(
          userAction.getAllDataProfile(
            getToken(),
            null,
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

  // item?.name = item?.person?.name
  //           item?.cargo = item?.profile?.name
  //           item?.celPhone
  const SENT_COLUMNS = [
    {
      name: "name",
      label: "Nome",
      render: (name) => <strong>{name}</strong>,
    },
    {
      name: "cargo",
      label: "Cargo",
      render: (cargo) => <span>{cargo}</span>,
    },
    {
      name: "celPhone",
      label: "Celular",
      render: (celPhone) => <span>{celPhone}</span>,
    },
  ];

  const openForm = () => {
    history.push("/register/professionalsInsert");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteProcedureLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        userAction.getAllDataProfile(
          getToken(),
          null,
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

  const edit = (id, row) => {
    history.push(
      {
        pathname: `/register/professionalsInsert/${id}`,
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
      // dispatch(pointsInterestAction.pointsInterestDelete(IdrowDelete, refreshList));
      setFlagModal(false);
    }
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
                      Adicionar Profissionais
                    </Button>
                  </Box>
                </div>
                {dataAllUserLoading || deleteProcedureLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : professionals?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhum profissional encontrado!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={professionals}
                    edit={edit}
                    del={handleDelete}
                    excluir={false}
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
export default withRouter(RegisteredProfessionals);
