import React from "react";
import { Box, Typography, TextField } from "@material-ui/core";
import { Field } from "formik";
import InputMask from "react-input-mask";
import "./RegisterComponents.scss";

const RegisterMaskedTextInput = (props) => {
	const { label, mask, ...fieldProps } = props;
	// console.log("fieldProps ->", fieldProps )
	return (
		<Box className="register-field">
			<Typography variant="subtitle1" className="register-field-label">
				{label}
			</Typography>

			<Field name={props.name}>
				{({ field, form: { touched, errors, setFieldValue }, meta }) => {
					
					const error = errors[props.name];
					const isTouched = touched[props.name];

					return (
						<Box>
							<InputMask mask={mask} {...field} maskChar=" ">
								{() => (
									<TextField
										helperText={isTouched &&  error}
										error={isTouched && !!error}
										fullWidth
										variant="outlined"
										margin="dense"
										{...fieldProps}
									/>
								)}
							</InputMask>
						</Box>
					);
				}}
			</Field>
		</Box>
	);
};

export default RegisterMaskedTextInput;
