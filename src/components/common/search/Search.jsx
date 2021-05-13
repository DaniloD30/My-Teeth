import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import { lighten } from "polished";

import "./Search.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 2px",
    display: "flex",
    alignItems: "center",
    // background: lighten(0.2, "#AFC3D2"),
    boxShadow: "unset",
    flex: 1,
    border: "1px solid rgba(0, 0, 0, 0.2)",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase(props) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <input
        id={props.id}
        className="search"
        type="search"
        value={searchTerm}
        onChange={(event) => {
          const value = event.target.value;

          setSearchTerm(value);
          props.search(value);
        }}
        placeholder="Pesquisar"
        required
      />
      <IconButton
        id={props.id + " button"}
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          props.search(searchTerm);
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
