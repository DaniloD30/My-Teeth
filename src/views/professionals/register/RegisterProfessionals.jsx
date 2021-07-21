import React from "react";

import Page from "~/components/common/page/Page";
import ProfessionalsForm from "~/components/professionals/ProfessionalsForm";
import { Container, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
const RegisterProfessionals = (props) => {
  const comeBack = () => {
    props.history.push("/register/professionals");
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
            <ProfessionalsForm comeback={comeBack} />
          </Container>
        </main>
      </Page>
    </>
  );
};

export default withRouter(RegisterProfessionals);
