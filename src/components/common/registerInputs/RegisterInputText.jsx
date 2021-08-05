import React from "react";
import { TextField } from "formik-material-ui";
import { Box, Typography } from "@material-ui/core";
import { Field } from "formik";
import "./RegisterComponents.scss";

const RegisterInputText = (props) => {
  const { label, maxL, type, ...fieldProps } = props;

  return (
    <Box className="register-field">
      <Typography variant="subtitle1" className="register-field-label">
        {label}
      </Typography>
      <Field
        component={TextField}
        type={type ? "password" : "text"}
        autocomplete={type ? "current-password" : ""}
        id={type ? "current-password" : ""}
        fullWidth
        variant="outlined"
        margin="dense"
        inputProps={{ maxLength: maxL }}
        {...fieldProps}
      />
    </Box>
  );
};

export default RegisterInputText;
