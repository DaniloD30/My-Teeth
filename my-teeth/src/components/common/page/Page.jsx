import React from "react";

import { makeStyles } from "@material-ui/core/styles";
// import Toolbar from "./Toolbar";

// import Fuso from "../fuso/Fuso";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    height: "100%",
  },
  bar: {
    position: "relative",
    top: 70,
    left: 70,
    width: 200,
    height: "100%",
    flexShrink: 0,
  },
  toolbar: {
    position: "fixed",
    top: 70,
    left: 70,
    width: 200,
    height: "calc(100vh - 70px)",
    background: "#fff",
    boxShadow: "0 0 5px 0 rgba(0,0,0,.33)",
    flexShrink: 0,
    overflowY: "auto",
    zIndex: 900,
  },
  children: {
    flexGrow: 1,
  },
  content: {
    width: "100%",
    padding: "70px 0 0 70px",
    boxSizing: "border-box",
  },
  boxBreadcrumbs: {
    display: "flex",
    alignItems: "baseline",
    padding: "18px 28px 5px 28px",
  },
  boxTopButtons: {
    marginLeft: 20,
  },
}));

const Page = (props) => {
  const classes = useStyles();
  // const { pageToolbar } = useSelector((state) => state.app);
  // const { fusoHorario } = useSelector((state) => state.auth);

  return (
    <div className={classes.container}>
      {/* <div className={classes.bar}>
        <div className={classes.toolbar}>
          <Toolbar>{props.bar}</Toolbar>
        </div>
      </div> */}

      <div className={classes.children}>
        <div className={classes.content}>
          {/* <Fuso tz={fusoHorario} /> */}
          <div className={classes.boxBreadcrumbs}>
            <Breadcrumbs />
            <div className={classes.boxTopButtons}>{props.topButtons}</div>
          </div>
          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
};

export default Page;
