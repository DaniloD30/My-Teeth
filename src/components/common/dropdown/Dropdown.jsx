import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import ExpandMore from "@material-ui/icons/ExpandMore";

const StyledMenu = withStyles({})((props) => (
	<Menu
		elevation={1}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
));

export default function Dropdown(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button style={{ padding: "0", minWidth: "0" }} onClick={handleClick}>
				<ExpandMore style={{ color: "#3D5564" }} />
			</Button>
			<StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				{props.children}
			</StyledMenu>
		</>
	);
}
