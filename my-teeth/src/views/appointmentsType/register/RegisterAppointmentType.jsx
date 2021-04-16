import React from "react";

import Page from "~/components/common/page/Page";
import AppointmentTypeForm from "~/components/appointmentType/AppointmentTypeForm";
import { Container, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
const RegisterAppointmentType = (props) => {
  const comeBack = () => {
    props.history.push("/register/appointmentsTypeList");
  };

  return (
    <>
      <Page
        topButtons={
          <Button
            className="comeback-button"
            id="extractReport"
            variant="contained"
            size="small"
            disableElevation
            startIcon={<ExitToAppTwoToneIcon />}
            onClick={() => {
              comeBack();
            }}
          >
            Voltar
          </Button>
        }
      >
        <main>
          {" "}
          <Container maxWidth="xl">
            <AppointmentTypeForm comeback={comeBack} />
          </Container>
        </main>
      </Page>
    </>
  );
};

export default withRouter(RegisterAppointmentType);
