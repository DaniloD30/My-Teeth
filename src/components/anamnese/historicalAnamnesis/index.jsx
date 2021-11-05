import { Button, Grid, Box, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import CardAnamnese from "../../cardAnamnese";
import AnamneseForm from "../AnamneseForm";
import { useDispatch, useSelector } from "react-redux";
import anamneseAction from "~/actions/anamneseAction";
import { isAuthenticated, getToken } from "~/services/auth";
import loginAction from "~/actions/loginAction";
import Utils from "~/helpers/Utils";
const HistoricalAnamnesis = ({ statePacient }) => {
  //GET ANAMNESE PARA PREENCHER O HISTORICO
  // BOTAO DE ADICIONAR ANAMNESE PARA IR DIRETO PARA A TELA JA CRIADA
  // O VOLTAR DA TELA DE ADICIONAR, LEVA PARA A TELA DE ANAMNESE COM O ID DO TabsCommon
  // para abrir direto para o anamnese
  const dispatch = useDispatch(); 
  const [modalAdd, setModalAdd] = React.useState(false);
  const [refetch, setRefetch] = React.useState(false);
  const anamnesis = useSelector((state) => state.anamnese?.anamnesis);
  const getAnamneseLoading = useSelector(
    (state) => state.app.loading.getAnamneseLoading
  );

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(
        anamneseAction.getAnamnese(
          getToken(),
          statePacient.id,
          "getAnamneseLoading",
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

            // Redireciona para a tela HOME com as permissões
          }
        )
      );
    }
  }, [dispatch, statePacient.id, refetch ]);
  

  return (
    <>
      <Box>
        <AnamneseForm
          statePacient={statePacient}
          open={modalAdd}
          refetch={() => setRefetch(true)}
          onClose={() => setModalAdd(false)}
        >
          <Box style={{ padding: "20px" }}>
            <Button
              id="submit-button"
              variant="contained"
              // className="save-button"
              color="primary"
              size="large"
              // fullWidth
              disableElevation
              // disabled={addAppointmentTypeLoading || editAppointmentTypeLoading}
              onClick={() => setModalAdd(true)}
              // disabled={addAnamneseLoading}
              // startIcon={loading.driver ? <CircularProgress size={18} /> : <ConfirmIcon />}
              // startIcon={<ConfirmIcon />}
            >
              Nova Anamnese
            </Button>
          </Box>
        </AnamneseForm>
      </Box>
      {getAnamneseLoading ? (
        <CircularProgress
          style={{ height: 14, width: 14, marginRight: 8 }}
          color={"#fff"}
        />
      ) : (
        <Grid container spacing={3}>
          {anamnesis?.map((item) => (
            // Saber o retorno do Item, para isso preciso salvar uma anamnese
            // para saber os dados e preencher o CardAnamnese
            <Grid item xs={3}>
              <CardAnamnese name={item?.main_complaint} description={item?.describe_main_complaint} colorAvatar="red" />
            </Grid>
          ))}
          {/* <Grid item xs={3}>
            <CardAnamnese name="Anamnese 1" colorAvatar="red" />
          </Grid>
          <Grid item xs={3}>
            <CardAnamnese name="Anamnese 2" colorAvatar="red" />
          </Grid>
          <Grid item xs={3}>
            <CardAnamnese name="Anamnese 3" colorAvatar="red" />
          </Grid>
          <Grid item xs={3}>
            <CardAnamnese name="Anamnese 4" colorAvatar="red" />
          </Grid> */}
        </Grid>
      )}
    </>
  );
};

export default HistoricalAnamnesis;
