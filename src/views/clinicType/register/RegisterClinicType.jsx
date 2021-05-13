import React from "react";

import Page from "~/components/common/page/Page";
import ClinicTypeForm from "~/components/clinicType/ClinicTypeForm";
import { Container, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
const RegisterClinicType = (props) => {

  const comeBack = () => {
    props.history.push("/register/clinicListType");
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
            <ClinicTypeForm comeback={comeBack} />
          </Container>
        </main>
      </Page>
    </>
  );
};

export default withRouter(RegisterClinicType);
