import React from "react";
import { withRouter } from "react-router";
import { Container, Button } from "@material-ui/core";
import Page from "~/components/common/page/Page";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import Anamnese from "./anamnese/Anamnese";
import ScheduledAppointments from "./scheduledAppointments/ScheduledAppointments";
import TabsCommon from "../../../components/common/tabs/TabsCommon";
import AboutCard from "../../../components/about/AboutCard";
import { useHistory } from "react-router-dom";

const RegisteredDetails = (props) => {
  let history = useHistory();
  const { location } = history;

 

  const comeBack = () => {
    props.history.push("/pacients/pacientsList");
  };

  const arrayTab = ["Sobre", "Anamnese", "Tratamentos", "Consultas"];

  const arrayComponents = (key) => {
    // if (key === 0) {
    //   return <Anamnese />;
    // }
    switch (key) {
      case 0:
        return <AboutCard statePacient={location?.state} />;
      case 1:
        return <Anamnese statePacient={location?.state}/>;
      case 2:
        return "Tratamentos ou Procedimentos (Ja existe a table Procedimentos)";
      case 3:
        return <ScheduledAppointments statePacient={location?.state}/>;
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
