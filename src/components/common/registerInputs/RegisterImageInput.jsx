import React from "react";
import { Box, Button, IconButton, FormControl, FormHelperText } from "@material-ui/core";
// import { CameraIcon, CloseIcon } from "~/components/common/icons/Icons";
import CameraSvg from "~/assets/icons/camera.svg";
import FecharSvg from "~/assets/icons/fechar.svg"
import Utils from "~/helpers/Utils";
import { Field } from "formik";
import "./RegisterComponents.scss";

const RegisterImageInput = (props) => {
	const { id } = props;

	return (
		<Box className="register-field">
			<Field name={props.name}>
				{({ field, form: { touched, errors, setFieldValue }, meta }) => {
					const thumb = field.value?.url || field.value?.base64;
					const error = errors[props.name];

					return (
						<FormControl >
							<Box className={`field-file`}>
								{thumb && !error && <img className="field-cover" src={thumb} alt={"Cover"} />}
								{(!thumb || !!error) && <Box className="field-placholder"> {props.placholderIcon} </Box>}
								<input
									hidden
									value={field.value?.inpuValue || ""}
									name={props.name}
									accept={props.accept || "image/*"}
									multiple={false}
									id={`contained-button-file-${id}`}
									type="file"
									onChange={(event) => {
										let newValue = {
											inputValue: event.target.value,
											file: event.target.files[0],
										};

										if (newValue.file) {
											Utils.fileToBase64(newValue.file).then((string) => {
												newValue["base64"] = string;
												setFieldValue(props.name, newValue);
											});
										}
									}}
								/>
								{thumb && (
									<IconButton
										className="close-button"
										onClick={() => {
											setFieldValue(props.name, {});
										}}>
										 <img src={FecharSvg} alt={"Icon Close"} {...props} />;
									</IconButton>
								)}

								<label htmlFor={`contained-button-file-${id}`}>
									<Button
										disabled={field.disabled}
										variant="contained"
										color="primary"
										disableElevation
										component="span">
										 <img src={CameraSvg} alt={"Icon Close"} {...props} />;
									</Button>
								</label>
							</Box>
							<FormHelperText error margin={props.margin || "dense"}>
								{error}
							</FormHelperText>
						</FormControl>
					);
				}}
			</Field>
		</Box>
	);
};

export default RegisterImageInput;
