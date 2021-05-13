import React from "react";
import { Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel, FormHelperText } from "@material-ui/core";
import { Field } from "formik";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import "./RegisterComponents.scss";

const RegisterRadio = (props) => {
	const { label, options, ...fieldProps } = props;

	return (
		<Box className="register-field register-field-checkbox">
			<Typography variant="subtitle1" className="register-field-label">
				{label}
			</Typography>

			<Field name={props.name}>
				{({ field, form: { touched, errors }, meta }) => {
					const error = errors[props.name];
					const isTouched = touched[props.name];

					return (
						<FormControl error={!!error} component="fieldset">
							<RadioGroup {...field} {...fieldProps} name={props.name} row>
								{options &&
									options.map((option, idx) => (
										<FormControlLabel
											key={idx}
											value={option.value}
											control={
												<Radio
													icon={<CheckBoxOutlineBlankIcon />}
													checkedIcon={<CheckBoxIcon />}
													color={props.color || "primary"}
												/>
											}
											label={option.label}
										/>
									))}
							</RadioGroup>

							<FormHelperText error margin={props.margin}>
								{isTouched && error}
							</FormHelperText>
						</FormControl>
					);
				}}
			</Field>
		</Box>
	);
};

export default RegisterRadio;
