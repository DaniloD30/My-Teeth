import React from "react";
import { withRouter } from "react-router";

import { Container } from "@material-ui/core";
// import profileAction from "../../../actions/profileAction";

import Page from "~/components/common/page/Page";

const RegisteredConsults = (props) => {
  return (
    <>
      <Page>
        <main>
          <Container
          // maxWidth="lg"
          // className="container-map-view register-driver-view"
          >
            <p>CONSULTAS DO DENTISTA " X "</p>
          </Container>
        </main>
      </Page>
    </>
  );
};
export default withRouter(RegisteredConsults);
