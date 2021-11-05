import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import clinicAccessAction from "~/actions/clinicAccessAction";
import loginAction from "~/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, getToken } from "~/services/auth";
import Utils from "~/helpers/Utils";
import { ToastContainer } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const style1 = {
  display: "flex",
  justifyContent: "space-between",
};

export default function ModalClientAccess({ open, onClose, history }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState({
    data: {
      clinic_id: +localStorage.getItem("clinic_id"),
    },
  });
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);
  const clinicAccessRequestLoading = useSelector(
    (state) => state.app.loading.clinicAccessRequestLoading
  );
  const handleSubmit = () => {
    // dispatch anamnese here
    // console.log("id user", statePacient);

    if (isAuthenticated()) {
      dispatch(
        clinicAccessAction.clinicAccess(
          value.data,
          getToken(),
          "clinicAccessRequestLoading",
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
              description: "Solicitação de acesso enviada com sucesso!",
            });

            setTimeout(function () {
              onClose();
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
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            E-mail do paciente para solicitar acesso:
          </Typography>
          <Box sx={style1}>
            {" "}
            <TextField
              name="email"
              helperText="E-mail"
              onChange={(event) =>
                setValue((value) => ({
                  ...value,
                  data: {
                    ...value.data,
                    [event.target.name]: event.target.value,
                  },
                }))
              }
              sx={{ mt: 2 }}
            />
            <Button
              disable={clinicAccessRequestLoading}
              onClick={() => handleSubmit()}
              color="primary"
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
