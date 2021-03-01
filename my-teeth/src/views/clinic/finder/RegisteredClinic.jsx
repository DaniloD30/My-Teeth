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
  const [modal, setFlagModal] = React.useState(false);

  const getClinicsLoading = useSelector(
    (state) => state.app?.loading?.getClinicsLoading
  );

  const deleteProfilesLoading = useSelector(
    (state) => state.app?.loading?.deleteProfilesLoading
  );

  useEffect(() => {
    console.log("clinic ->", clinics)
    // if (!deleteProfilesLoading) {
    //   dispatch(profileAction.getProfiles("getProfilesLoading", 1));
    // }
  }, [clinics]);

  // "rows": [
  //   {
  //     "id": 2,
  //     "company_name": "Clinica Denison",
  //     "main_office": "Sim",
  //     "cnpj": "123456789101",
  //     "state_registration": "1234321",
  //     "municipal_registration": "34565432",
  //     "site": "www.clinicadenison.com.br",
  //     "type": true,
  //     "due_date": 10,
  //     "service_rate": "1.00",
  //     "login_wirecard": "Sim",
  //     "payment_slip": false,
  //     "payment_transfer": false,
  //     "payment_card": true,
  //     "clinic_type_id": 1,
  //     "createdAt": "2021-03-01T17:34:01.000Z",
  //     "updatedAt": "2021-03-01T17:34:01.000Z",
  //     "clinicTypeId": 1,
  //     "clinicType": {
  //       "id": 1,
  //       "name": "Matriz",
  //       "description": "Qualquer coisa",
  //       "active": true,
  //       "createdAt": "2021-02-19T15:11:14.000Z",
  //       "updatedAt": "2021-02-19T15:11:14.000Z"
  //     }
  //   }
  // ]
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
      name: "company_name",
      label: "Nome da Clínica",
      render: (name) => <span>{name}</span>,
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
    // dispatch(profileAction.getProfiles("getProfilesLoading", value));
  };

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(clinicAction.getAllCinics(getToken(), "getClinicsLoading"));
    } else {
      Utils.showError("Não autenticado!");
      setTimeout(function () {
        history.push("/login");
      }, 5000);
    }
  }, [dispatch, history]);

  const edit = (id, row) => {
    history.push(
      {
        pathname: `/users/profile/insert/${id}`,
      },
      row
    );
  };

  const handleDelete = (row) => {
    setIdRowDelete(row.idPerfil);
    setFlagModal(true);
  };

  const confirmDeleteRow = () => {
    // dispatch(
    //   profileAction.deleteProfile(
    //     IdrowDelete,
    //     "deleteProfilesLoading",
    //     (error) => {
    //       if (error) {
    //         Utils.showError(error);
    //         return;
    //       }

    //       Utils.showToast({
    //         type: "success",
    //         description: "Perfil deletado com sucesso",
    //       });

    //       // props.comeback();
    //     }
    //   )
    // );
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
                {getClinicsLoading? (
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
