import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import "./Pagination.scss";

const useStyles = makeStyles((theme) => ({
  rootPagination: {
    "& ul li button": {
      color: theme.palette.primary.main,
    },
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationRounded(props) {
  const classes = useStyles();

  return (
    <div className={classes.rootPagination}>
      <Pagination
        id={"pagination"}
        data-id={"pagination"}
        color="primary"
        {...props}
        count={props.count}
        shape="rounded"
      />
    </div>
  );
}
