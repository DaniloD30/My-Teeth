import { Box, Divider } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import RadioMaterialUi from "../common/radioMaterialUi/RadioMaterialUi";

const AnamneseForm = (props) => {
  const [value, setValue] = React.useState({
    data: {
      sexo: "male",
      teste: "teste",
    },
  });
  const handleChange = (event) => {
    event.persist();
    setValue((formState) => ({
      ...formState,
      data: {
        ...formState.data,
        [event.target.name]: event.target.value,
      },
    }));
  };
  //   const handleChange = (event) => {
  //     setValue(event.target.value);
  //   };
  const valuesArrayRadio = [
    {
      title: "Sente alguma dor nos dentes?",
      value: value?.data?.sexo,
      name: "sexo",
      handleC: handleChange,
      label: ["Female", "Male"],
      valueLabel: ["female", "male"],
    },
    {
      title: "Teste",
      value: value?.data?.teste,
      name: "teste",
      handleC: handleChange,
      label: ["Teste", "Teste 2"],
      valueLabel: ["teste", "teste2"],
    },
  ];

  return (
    <>
      <Box>
        <Box style={{ padding: "10px", width: "50%" }}>
          <TextField
            id="standard-full-width"
            // label="Queixa Principal?"
            // style={{ margin: 8 }}
            placeholder="Queixa Principal?"
            // helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ maxLength: 255 }}
          />
        </Box>
        <Divider />
        {valuesArrayRadio?.map((item) => (
          <RadioMaterialUi
            title={item?.title}
            value={item?.value}
            name={item?.name}
            handleC={handleChange}
            label={item?.label}
            valueLabel={item?.valueLabel}
          />
        ))}
      </Box>
    </>
  );
};

export default AnamneseForm;
