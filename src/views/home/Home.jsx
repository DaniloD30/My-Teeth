import Page from "~/components/common/page/Page";
import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import CardDashboard from "../../components/card/CardDashboard";
import Sales from "../../components/chart/Bar";
import TrafficByDevice from "../../components/chart/Doughnut/Doughnut";
import LatestProducts from "../../components/card/LatestProducts";
import LatestOrders from "../../components/card/LatestOrders";

const Home = () => {
  const cardArray = [
    {
      name: "PACIENTES",
      colorAvatar: "red",
    },
    {
      name: "TOTAL CUSTOMERS",
      colorAvatar: "green",
    },
    {
      name: "TASKS PROGRESS",
      colorAvatar: "orange",
    },
    {
      name: "TOTAL PROFIT",
      colorAvatar: "indigo",
    },
  ];
  return (
    <>
      <Page>
        <Box
          style={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
          // sx={{
          //   backgroundColor: "background.default",
          //   minHeight: "100%",
          //   py: 3,
          // }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              {cardArray.map((item) => (
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <CardDashboard
                    name={item.name}
                    colorAvatar={item.colorAvatar}
                  />
                </Grid>
              ))}

              {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CardDashboard name="TOTAL CUSTOMERS" colorAvatar="green" />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CardDashboard name="TASKS PROGRESS" colorAvatar="orange" />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CardDashboard name="TOTAL PROFIT" colorAvatar="indigo" />
              </Grid> */}
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Sales />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficByDevice style={{ height: "100%" }} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <LatestProducts style={{ height: "100%" }} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <LatestOrders />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Page>
    </>
  );
};

export default Home;
