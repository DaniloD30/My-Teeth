// import React from "react";
// import { Box, Typography } from "@material-ui/core";
// import { DatePicker } from "formik-material-ui-pickers";
// import MomentUtils from "@date-io/moment";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { Field } from "formik";
// import "./RegisterComponents.scss";

// const RegisterDatePicker = (props) => {
// 	const { label, ...fieldProps } = props;

// 	return (
// 		<Box className="register-field">
// 			<Typography variant="subtitle1" className="register-field-label">
// 				{label}
// 			</Typography>
// 			<MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">
// 				<Field
// 					component={DatePicker}
// 					inputVariant="outlined"
// 					variant="inline"
// 					format="DD/MM/yyyy"
// 					placeholder="   /   /   "
// 					margin="dense"
// 					{...fieldProps}
// 				/>
// 			</MuiPickersUtilsProvider>
// 		</Box>
// 	);
// };

// export default RegisterDatePicker;
