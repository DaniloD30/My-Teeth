import {
  Box,
  Divider,
  Backdrop,
  TextField,
  Button,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/styles";
import RadioMaterialUi from "../common/radioMaterialUi/RadioMaterialUi";
import anamneseAction from "~/actions/anamneseAction";
import loginAction from "~/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, getToken } from "~/services/auth";
import { ToastContainer } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import pt from "date-fns/locale/pt-BR";
import DateFnsUtils from "@date-io/date-fns";
import Utils from "~/helpers/Utils";

const useStyles = makeStyles({
  presentation: {
    diaplay: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "64px",
  },
  modalPresentation: {
    outline: "none",
  },
  modalCard: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
    background: "#ffffff",
    boxShadow:
      "0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)",
    width: "100vw",
    height: "calc(100vh - 64px)", // 64px == toolbar height
  },
  modalBody: {
    padding: "32px 24px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "24px 24px 0 24px",
    alignItems: "center",
    height: "67px",
    width: "100%",
  },
  modalHeaderItem: {
    display: "flex",
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight:'normal',
    letterSpacing: '0.18px',
    lineHeight: '24px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginLeft: '20px',
  },
  headerIcon: {
    color: 'rgba(0, 0, 0, 0.6)',
    cursor: 'pointer',
  },
});

const AnamneseForm = ({ statePacient, history, open, onClose, children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const [value, setValue] = React.useState({
    data: {
      are_you_taking_any_medication: "",
      what_medications_tak: "",

      allergy_to_medications_or_anesthetics: "",
      what_medications_are_allergic: "",
      screening_date: new Date(),
      blood_pressure_is_high: "",
      controlled_high_pressure: "",
      describe_main_complaint: "",
      clinic_id: +localStorage.getItem("clinic_id"),
      userpatient_id: statePacient.id,
      userdentist_id: +localStorage.getItem("userid"),
      userregistered_id: +localStorage.getItem("userid"),
      have_diabetes: "",
      what_type_of_diabetes: "",
    },
  });

  const addAnamneseLoading = useSelector(
    (state) => state.app?.loading?.addAnamneseLoading
  );

  const handleChange = (event) => {
    // event.persist();
    console.log("event", event);
    // console.log("event ->", event.target.name);
    // console.log("value ->", event.target.value);
    if (typeof event.getMonth === "function") {
      setValue((value) => ({
        ...value,
        data: {
          ...value.data,
          screening_date: event,
        },
      }));
    } else {
      setValue((value) => ({
        ...value,
        data: {
          ...value.data,
          [event.target.name]: event.target.value,
        },
      }));
    }
  };

  const valuesArrayRadio = [
    {
      title: "Está tomando algum medicamento?",
      value: value?.data?.are_you_taking_any_medication,
      name: "are_you_taking_any_medication",
      nameIfYes: "what_medications_tak",
      handleC: handleChange,
      label: ["Sim", "Não"],
      yesAsk: "Qual medicamento?",
    },
    {
      title: "Alergia a algum medicamento ou anestesia?",
      value: value?.data?.allergy_to_medications_or_anesthetics,
      name: "allergy_to_medications_or_anesthetics",
      nameIfYes: "what_medications_are_allergic",
      handleC: handleChange,
      label: ["Sim", "Não"],
      yesAsk: "Qual medicamento?",
    },
    {
      title: "Está com pressão alta?",
      value: value?.data?.blood_pressure_is_high,
      name: "blood_pressure_is_high",
      nameIfYes: "controlled_high_pressure",
      handleC: handleChange,
      label: ["Sim", "Não"],
      yesAsk: "Pressão?",
    },
    {
      title: "Tem Diabetes?",
      value: value?.data?.have_diabetes,
      name: "have_diabetes",
      nameIfYes: "what_type_of_diabetes",
      handleC: handleChange,
      label: ["Sim", "Não"],
      yesAsk: "Qual tipo de diabate?",
    },
  ];

  const handleSubmit = () => {
    // dispatch anamnese here
    console.log("id user", statePacient);
    console.log("value ->", value);
    if (isAuthenticated()) {
      dispatch(
        anamneseAction.addAnamnese(
          value.data,
          getToken(),
          "addAnamneseLoading",
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
              description: "Anamnese adicionada com sucesso!",
            });

            // setTimeout(function () {
            //   props.comeback();
            // }, 3000);

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
  };

  const onCloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

  // PARA O OUTRO, TEREI QUE PASSAR UMA PROP TBM, Ex: OtherDor
  return (
    <>
      {children}
      <ToastContainer />
      <Modal
        BackdropComponent={(props) => <Backdrop {...props} invisible />}
        open={open}
        onClose={onCloseModal}
        className={classes.presentation}
      >
        <Box className={classes.modalPresentation}>
          <Box className={classes.modalCard}>
            <Box className={classes.modalHeader}>
              <Box className={classes.modalHeaderItem}>
                <ArrowBackIcon
                  className={classes.headerIcon}
                  onClick={onCloseModal}
                />
                <Typography variant="h3" className={classes.headerTitle}>
                  Adicionar Anamnese
                </Typography>
              </Box>
              <Box className={classes.modalHeaderItem}>
                <Button
                  id="submit-button"
                  variant="contained"
                  // className="save-button"
                  color="primary"
                  size="large"
                  // fullWidth
                  // disableElevation
                  // disabled={addAppointmentTypeLoading || editAppointmentTypeLoading}
                  onClick={handleSubmit}
                  disabled={addAnamneseLoading}
                  // startIcon={loading.driver ? <CircularProgress size={18} /> : <ConfirmIcon />}
                  // startIcon={<ConfirmIcon />}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
            <Box className={classes.modalBody}>
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <Box style={{ padding: "10px" }}>
                    <TextField
                      id="standard-full-width"
                      label="Queixa Principal"
                      // style={{ margin: 8 }}
                      name="main_complaint"
                      placeholder="Queixa Principal?"
                      // helperText="Full width!"
                      fullWidth
                      onChange={handleChange}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{ maxLength: 255 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box style={{ padding: "10px" }}>
                    <MuiPickersUtilsProvider locale={pt} utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        value={value.data.screening_date}
                        onChange={(date) => handleChange(date)}
                        inputVariant="outlined"
                        name="screening_date"
                        // minDate={dayjs(new Date(1999, 12, 31))}
                        minDateMessage="Data inválida"
                        // maxDateMessage="Os dados não devem ser posteriores à data final"
                        // maxDate={finalDateMemo}
                        label="Data da anamnese"
                        cancelLabel="Cancelar"
                        // format="DD/MM/YYYY"
                        format="dd/MM/yyyy"
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                </Grid>
              </Grid>

              <Divider />
              {valuesArrayRadio?.map((item) => (
                <RadioMaterialUi
                  title={item?.title}
                  value={item?.value}
                  name={item?.name}
                  nameIfYes={item?.nameIfYes}
                  handleC={handleChange}
                  label={item?.label}
                  valueLabel={item?.valueLabel}
                  yesAsk={item.yesAsk}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AnamneseForm;
