import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { Container, Button } from "@material-ui/core";
import Page from "~/components/common/page/Page";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import Anamnese from "./anamnese/Anamnese";
import TabsCommon from "../../../components/common/tabs/TabsCommon";

const RegisteredDetails = (props) => {
  useEffect(() => {}, []);

  const comeBack = () => {
    props.history.push("/pacients/pacientsList");
  };

  const arrayTab = ["Anamnese", "Tratamentos", "Consultas"];

  const arrayComponents = (key) => {
    // if (key === 0) {
    //   return <Anamnese />;
    // }
    switch (key) {
      case 0:
        return <Anamnese />;
      case 1:
        return "Tratamentos";
      case 2:
        return "Consultas";
      default:
        break;
    }
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
            <TabsCommon
              arrayTabs={arrayTab}
              arrayComp={arrayComponents}
            ></TabsCommon>
          </Container>
        </main>
      </Page>
    </>
  );
};
export default withRouter(RegisteredDetails);
