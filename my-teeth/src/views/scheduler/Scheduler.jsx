import React from "react";
// import { Typography } from "@material-ui/core";
import SchedulerComponent from "~/components/scheduler/SchedulerComponent";
import Page from "~/components/common/page/Page";
const Scheduler = (props) => {
  return (
    <>
      <Page>
        <SchedulerComponent />
      </Page>
    </>
  );
};

export default Scheduler;
