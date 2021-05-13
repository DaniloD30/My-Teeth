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
  const { title, handleC, value, label, valueLabel, name } = props;

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
                value={valueLabel[0]}
                control={<Radio />}
                label={label[0]}
              />
              <FormControlLabel
                value={valueLabel[1]}
                control={<Radio />}
                label={label[1]}
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {value === "other" && (
            <TextField
              id="standard-full-width"
              // label="Queixa Principal?"
              // style={{ margin: 8 }}
              placeholder="Qual?"
              // helperText="Full width!"
              fullWidth
              margin="normal"
              name={name}
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
