import React from "react";
import { TextField } from "formik-material-ui";
import { Box, Typography } from "@material-ui/core";
import { Field } from "formik";
import "./RegisterComponents.scss";

const RegisterInputText = (props) => {
	const { label, ...fieldProps } = props;

	return (
		<Box className="register-field">
			<Typography variant="subtitle1" className="register-field-label">
				{label}
			</Typography>
			<Field
				component={TextField}
				type="text"
				fullWidth
				variant="outlined"
				margin="dense"
				inputProps={{ maxLength: 50 }}
				{...fieldProps}
			/>
		</Box>
	);
};

export default RegisterInputText;
