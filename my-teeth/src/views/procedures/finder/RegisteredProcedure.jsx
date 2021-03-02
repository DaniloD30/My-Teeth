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
import procedureAction from "~/actions/procedureAction";
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
const RegisteredProcedure = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const procedures = useSelector((state) => state.procedure?.procedures);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const getProceduresLoading = useSelector(
    (state) => state.app?.loading?.getProceduresLoading
  );

  const deleteProcedureLoading = useSelector(
    (state) => state.app?.loading?.deleteProcedureLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(
          procedureAction.getAllProcedures(getToken(), "getProceduresLoading")
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

  // "id": 1,
  // "description": "Limpeza",
  // "value": "50",
  const SENT_COLUMNS = [
    {
      name: "id",
      label: "ID",
      render: (id) => <strong>{id}</strong>,
    },
    {
      name: "description",
      label: "Descrição",
      render: (description) => <span>{description}</span>,
    },
    {
      name: "value",
      label: "Valor",
      render: (value) => <span>{value}</span>,
    },
  ];

  const openForm = () => {
    history.push("/register/procedureInsert");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteProcedureLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        procedureAction.getAllProcedures(getToken(), "getProceduresLoading")
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
        pathname: `/register/procedureInsert/${id}`,
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
        procedureAction.deleteProcedure(
          getToken(),
          IdrowDelete,
          "deleteProcedureLoading",
          (error) => {
            if (error) {
              Utils.showError(error);
              return;
            }

            Utils.showToast({
              type: "success",
              description: "Procedimento deletado com sucesso",
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
                      Adicionar Procedimento
                    </Button>
                  </Box>
                </div>
                {getProceduresLoading || deleteProcedureLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : procedures?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhum procedimento encontrado!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={procedures}
                    edit={edit}
                    del={handleDelete}
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
export default withRouter(RegisteredProcedure);
