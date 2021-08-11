import { Box, Divider, TextField, Button } from "@material-ui/core";
import React from "react";
import RadioMaterialUi from "../common/radioMaterialUi/RadioMaterialUi";

const AnamneseForm = (props) => {
  const [value, setValue] = React.useState({
    data: {
      dor: "",
    },
  });

  const handleChange = (event) => {
    event.persist();
    console.log("event ->", event.target.name);
    console.log("value ->", event.target.value);
    setValue((value) => ({
      ...value,
      data: {
        ...value.data,
        [event.target.name]: event.target.value,
      },
    }));
  };

  const valuesArrayRadio = [
    {
      title: "Sente alguma dor nos dentes?",
      value: value?.data?.dor,
      name: "dor",
      handleC: handleChange,
      label: ["Sim", "Não"],
      yesAsk: "Qual intensidade?",
    },
  ];

  const handleSubmit = () => {
    // dispatch anamnese here
  };

  // PARA O OUTRO, TEREI QUE PASSAR UMA PROP TBM, Ex: OtherDor
  return (
    <>
      <Box>
        <Box style={{ padding: "10px", width: "50%" }}>
          <Button
            id="submit-button"
            variant="contained"
            // className="save-button"
            color="primary"
            size="large"
            // fullWidth
            disableElevation
            // disabled={addAppointmentTypeLoading || editAppointmentTypeLoading}
            onClick={handleSubmit}
            // disabled={loading.driver}
            // startIcon={loading.driver ? <CircularProgress size={18} /> : <ConfirmIcon />}
            // startIcon={<ConfirmIcon />}
          >
            Salvar
          </Button>
        </Box>
        <Box style={{ padding: "10px", width: "50%" }}>
          <TextField
            id="standard-full-width"
            // label="Queixa Principal?"
            // style={{ margin: 8 }}
            placeholder="Queixa Principal?"
            // helperText="Full width!"
            fullWidth
            onChange={handleChange}
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
            yesAsk={item.yesAsk}
          />
        ))}
      </Box>
    </>
  );
};

export default AnamneseForm;
