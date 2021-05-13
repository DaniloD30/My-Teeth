import React from "react";

import Page from "~/components/common/page/Page";
import ProcedureForm from "~/components/procedure/ProcedureForm";
import { Container, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
const RegisterProcedure = (props) => {
  const comeBack = () => {
    props.history.push("/register/procedureList");
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
            <ProcedureForm comeback={comeBack} />
          </Container>
        </main>
      </Page>
    </>
  );
};

export default withRouter(RegisterProcedure);
