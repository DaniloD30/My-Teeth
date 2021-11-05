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
// import ModalCommon from "~/components/common/modal/Modal";
import ModalClientAccess from "./ModalClientAccess";
import Utils from "~/helpers/Utils";
import loginAction from "~/actions/loginAction";
const RegisteredPacients = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const pacient = useSelector((state) => state.user?.cliente);
  const [modal, setFlagModal] = React.useState(false);
  const [data, setData] = React.useState();

  const dataAllUserLoading = useSelector(
    (state) => state.app?.loading?.dataAllUserLoading
  );

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
  
  const handlePage = (event, value) => {
    // change page
    // dispatch(profileAction.getProfiles("deleteClinicLoading", value));
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

  const handleDetail = (row) => {
    history.push(
      {
        pathname: `/pacients/details`,
      },
      row
    );
  };

  // const handleCloseModal = () => {
  //   setFlagModal(false);
  // };

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
                <div style={{ padding: "10px" }}>
                  <Box>
                    <Button
                      id="add-button-driver"
                      className="report-save-button"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={() => setFlagModal(true)}
                    >
                      {/* <AddIcon /> */}
                      <img
                        alt="addIcon"
                        src={AddIcon}
                        style={{ height: "auto", width: 20, padding: 3 }}
                      />
                      Solicitar acesso a um novo paciente
                    </Button>
                  </Box>
                </div>
                {dataAllUserLoading ? (
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
                {/* <ModalCommon
                  title={"Confirma Exclusão do registro selecionado?"}
                  confirmDelete={confirmDeleteRow}
                  handleClose={handleCloseModal}
                  flag={modal}
                /> */}
                <ToastContainer />
                <ModalClientAccess open={modal} onClose={() => setFlagModal(false)}/>
              </Grid>
            </Grid>
          </Container>
        </main>
      </Page>
    </>
  );
};
export default withRouter(RegisteredPacients);
