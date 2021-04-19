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
import clinicTypeAction from "~/actions/clinicTypeAction";
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
const RegisteredClinicType = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const clinics = useSelector((state) => state.clinicType?.clinicsType);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const getClinicsTypeLoading = useSelector(
    (state) => state.app?.loading?.getClinicsTypeLoading
  );

  const deleteClinicTypeLoading = useSelector(
    (state) => state.app?.loading?.deleteClinicTypeLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(clinicTypeAction.getAllClinicsType(getToken(), "getClinicsTypeLoading"));
      } else {
        Utils.showError("Não autenticado!");
        setTimeout(function () {
          history.push("/login");
        }, 3000);
      }
    }
    setIsDelete(false);
  }, [dispatch, isDelete, history]);
  // "description": "Qualquer coisa",
  //     "active": true,
  const SENT_COLUMNS = [
    {
      name: "name",
      label: "Nome",
      render: (name) => <span>{name}</span>,
    },
    {
      name: "description",
      label: "Descrição",
      render: (description) => <strong>{description}</strong>,
    }
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
      dispatch(clinicTypeAction.getAllClinicsType(getToken(), "getClinicsTypeLoading"));
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
        pathname: `/register/clinicTypeInsert/${id}`,
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
        clinicTypeAction.deleteClinicType(
          getToken(),
          IdrowDelete,
          "deleteClinicTypeLoading",
          (error) => {
            if (error) {
              Utils.showError(error);
              return;
            }

            Utils.showToast({
              type: "success",
              description: "Tipo de Clínica deletada com sucesso",
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
                      Adicionar Tipo de Clínica
                    </Button>
                  </Box>
                </div>
                {getClinicsTypeLoading || deleteClinicTypeLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : clinics?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhum tipo de clínica encontrado!
                  </Typography>
                ) : (
                  <Table
                    columns={SENT_COLUMNS}
                    dataSource={clinics}
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
export default withRouter(RegisteredClinicType);
