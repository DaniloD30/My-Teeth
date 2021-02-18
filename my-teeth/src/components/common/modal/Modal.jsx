import React from "react";
import {  Button, Box } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
const ModalCommon = (props) => {
	return (
		<div>
			<Dialog  onClose={props.handleClose} varia-labelledby="simple-dialog-title" open={props.flag}>
				<DialogTitle id="simple-dialog-title">{props.title}</DialogTitle>
				<Box style={{ display: "flex" , justifyContent: 'flex-end'}}>
					<Button onClick={props.confirmDelete}>Sim</Button>
					<Button onClick={props.handleClose}>Não</Button>
				</Box>
			</Dialog>
		</div>
	);
};

export default ModalCommon;
