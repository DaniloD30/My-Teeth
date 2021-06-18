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
import { isAuthenticated, getToken } from "~/services/auth";
import Page from "~/components/common/page/Page";
import Table from "~/components/common/table/Table";
import AddIcon from "~/assets/icons/mais.svg";
import Pagination from "~/components/common/pagination/Pagination";
import { ToastContainer } from "react-toastify";
import ModalCommon from "~/components/common/modal/Modal";
import Utils from "~/helpers/Utils";
const RegisteredClinic = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const clinics = useSelector((state) => state.clinic?.clinics);
  const [IdrowDelete, setIdRowDelete] = React.useState();
  const [isDelete, setIsDelete] = React.useState(false);
  const [modal, setFlagModal] = React.useState(false);

  const getClinicsLoading = useSelector(
    (state) => state.app?.loading?.getClinicsLoading
  );

  const deleteClinicLoading = useSelector(
    (state) => state.app?.loading?.deleteClinicLoading
  );

  useEffect(() => {
    if (isDelete) {
      if (isAuthenticated()) {
        dispatch(
          clinicAction.getAllClinics(
            getToken(),
            "getClinicsLoading",
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
      name: "cnpj",
      label: "CNPJ",
      render: (cnpj) => <strong>{cnpj}</strong>,
    },
    {
      name: "company_name",
      label: "Nome da Clínica",
      render: (company) => <span>{company}</span>,
    },
    {
      name: "site",
      label: "Site da Clínica",
      render: (site) => <span>{site}</span>,
    },
  ];

  const openForm = () => {
    history.push("/register/clinicInsert");
  };

  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteClinicLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        clinicAction.getAllClinics(getToken(), "getClinicsLoading", (error) => {
          if (error) {
            Utils.showError(error);
            return;
          }
        })
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
        pathname: `/register/clinicInsert/${id}`,
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
        clinicAction.deleteClinic(
          getToken(),
          IdrowDelete,
          "deleteClinicLoading",
          (error) => {
            if (error) {
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
                      Adicionar Clínica
                    </Button>
                  </Box>
                </div>
                {getClinicsLoading || deleteClinicLoading ? (
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                  </Box>
                ) : clinics?.length < 1 ? (
                  <Typography variant="h3" style={{ textAlign: "center" }}>
                    Nenhuma clínica encontrado!
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
export default withRouter(RegisteredClinic);
