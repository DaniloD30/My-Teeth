import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
const RadioMaterialUi = (props) => {
  //   const [value, setValue] = React.useState("female");
  const { title, handleC, value, label, nameIfYes, name, yesAsk } = props;

  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };

  // if value === 'other', mostra o campo para dizer qual o outro

  return (
    <>
      <Box>
        <Box style={{ padding: "10px" }}>
          <Typography>{title}</Typography>
          <FormControl>
            <RadioGroup value={value} name={name} onChange={handleC}>
              <FormControlLabel
                value="true"
                control={<Radio />}
                label={label[0]}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label={label[1]}
              />
              {/* <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              /> */}
            </RadioGroup>
          </FormControl>
          {value === "true" && (
            <TextField
              id="standard-full-width"
              label={yesAsk}
              // style={{ margin: 8 }}
              placeholder={yesAsk}
              // helperText="Full width!"
              fullWidth
              margin="normal"
              name={nameIfYes}
              onChange={handleC}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ maxLength: 255 }}
            />
          )}

          <Divider />
        </Box>
      </Box>
    </>
  );
};

export default RadioMaterialUi;
