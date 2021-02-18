import React from "react";
import { Select } from "formik-material-ui";
import { Box, Typography, MenuItem, CircularProgress, FormControl, FormHelperText } from "@material-ui/core";
import { Field } from "formik";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import "./RegisterComponents.scss";

const RegisterSelect = (props) => {
	const { label, options, loading, name } = props;

	const MiniCircularProfess = () => <CircularProgress size={17} style={{ marginRight: "1rem" }} />;

	const error = props.errors && props.errors[props.name];
	const touched = props.touched && props.touched[props.name];

	return (
		<Box className="register-field">
			<FormControl fullWidth margin="dense">
				<Typography variant="subtitle1" className="register-field-label">
					{label}
				</Typography>
				<Field
					name={name}
					component={Select}
					type="text"
					fullWidth
					variant="outlined"
					margin="dense"
					error={touched && !!error}
					IconComponent={loading ? MiniCircularProfess : ExpandMoreRoundedIcon}>
					{options &&
						options.map((option, idx) => {
							let value;
							let text;

							if (typeof option === "string") {
								value = text = option;
							} else {
								value = option.value;
								text = option.label;
							}

							return (
								<MenuItem key={idx} value={idx}>
									{text}
								</MenuItem>
							);
						})}
				</Field>
				<FormHelperText error margin="dense" variant="outlined">
					{touched && error}
				</FormHelperText>
			</FormControl>
		</Box>
	);
};

export default RegisterSelect;
