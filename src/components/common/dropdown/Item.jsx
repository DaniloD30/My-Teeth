import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
	},
});

const Item = (props) => {
	const classes = useStyles();

	return <div className={classes.root}>{props.children}</div>;
};

export default Item;
