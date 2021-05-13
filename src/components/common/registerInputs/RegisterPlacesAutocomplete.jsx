import React from "react";
import { Box, Typography } from "@material-ui/core";
import PlacesAutocomplete from "~/components/common/placesAutocomplete/PlacesAutocomplete";
import { Field } from "formik";
import "./RegisterComponents.scss";

const RegisterPlacesAutocomplete = (props) => {
	const { label, ...fieldProps } = props;

	return (
		<Box className="register-field">
			<Typography variant="subtitle1" className="register-field-label">
				{label}
			</Typography>

			<Field name={props.name}>
				{({ field, form: { touched, errors, setFieldValue, setFieldTouched }, meta }) => {
					const error = errors[props.name];
					const isTouched = touched[props.name];
					return (
						<Box>
							<PlacesAutocomplete
								{...fieldProps}
								inputValue={field.value.sugestion ? field.value.sugestion.description : ""}
								onChange={(value) => {
									setFieldValue(props.name, value);
									props.onChange && props.onChange(value);
								}}
								onBlur={() => {
									setFieldTouched(props.name, true);
								}}
								helperText={isTouched && error}
								error={isTouched && !!error}
							/>
						</Box>
					);
				}}
			</Field>
		</Box>
	);
};

export default RegisterPlacesAutocomplete;
