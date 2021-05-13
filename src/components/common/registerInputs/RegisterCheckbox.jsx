import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@material-ui/core";
import { Field } from "formik";
import "./RegisterComponents.scss";

const RegisterCheckbox = (props) => {
  const { label, labelLegend, ...fiedProps } = props;

  return (
    <Box className="checkBox">
      <Typography variant="subtitle1" className="register-field-label">
        {label}
      </Typography>

      <Field name={props.name}>
        {({ field, form: { touched, errors, setFieldValue }, meta }) => {
          const { value, ...fieldFunctions } = field;

          const error = errors[props.name];
          const isTouched = touched[props.name];

          return (
            <FormControl error={!!error} component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    {...fieldFunctions}
                    {...fiedProps}
                    checked={value}
                  />
                }
                label={labelLegend}
              />
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

export default RegisterCheckbox;
