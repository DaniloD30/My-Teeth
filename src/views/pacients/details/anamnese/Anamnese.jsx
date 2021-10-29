import React, { useEffect } from "react";
// import AnamneseForm from "../../../../components/anamnese/AnamneseForm";
import HistoricalAnamnesis from "../../../../components/anamnese/historicalAnamnesis";
const Anamnese = ({statePacient}) => {
  useEffect(() => {}, []);

  return (
    <>
    <HistoricalAnamnesis statePacient={statePacient} />
      {/* <AnamneseForm statePacient={statePacient}/> */}
    </>
  );
};
export default Anamnese;
