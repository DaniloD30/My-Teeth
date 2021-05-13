import {
  Avatar,
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Utils from "~/helpers/Utils";
const CardPart = (props) => {
  const { title, data } = props;
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">{data}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

const AboutCard = (props) => {
  const { statePacient } = props;
  const [imageUser, setImage] = useState("");
  const dataPart = [
    {
      nameOfCamp: "CPF:",
      data: statePacient?.cpf,
    },
    {
      nameOfCamp: "Data de nascimento:",
      data: statePacient?.birthday,
    },
    {
      nameOfCamp: "Gênero:",
      data: statePacient?.genre,
    },
    {
      nameOfCamp: "Celular:",
      data: statePacient?.phone_mobile,
    },
    {
      nameOfCamp: "RG:",
      data: statePacient?.rg,
    },
  ];

  // `data:image/png;base64, ${Utils._arrayBufferToBase64(
  //   statePacient?.data

  useEffect(() => {
    if (statePacient?.picture) {
      // let file = Utils.ab2str(userDataProfile?.picture?.data);
      let file = `data:image/png;base64, ${Utils._arrayBufferToBase64(
        statePacient?.picture?.data
      )}`;
      setImage(file);
    }
  }, [statePacient]);

  return (
    <>
      <Box style={{ padding: "10px" }}>
        <Container maxWidth="md">
          <Paper>
            <Grid container>
              <Grid item xs={12}>
                <Grid container  style={{ backgroundColor: "#f2f3f5", padding: "5px" }}>
                  <Avatar variant="square" src={imageUser}/>
                  <Typography
                    variant="h4"
                    style={{  padding: "5px" }}
                  >
                    {statePacient?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Box style={{ padding: "10px", width: "100%" }}>
                {dataPart.map((item) => (
                  <CardPart title={item?.nameOfCamp} data={item?.data} />
                ))}
              </Box>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default AboutCard;
