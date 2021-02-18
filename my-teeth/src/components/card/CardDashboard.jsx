import React from "react";
import { Box, Card, Divider, Typography } from "@material-ui/core";


const CardDashboard = (props) => {
  const { color, title, icon } = props;
  return (
    <>
      <Card
        style={{
          width: "150px",
          backgroundColor: color,
          padding: "10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Box style={{ marginRight: "20px" }}>
            {icon}
          </Box>
        </Box>
        <Divider style={{ marginTop: "10px", padding: "1px" }} />
        <Box style={{ padding: "10px" }}>
          <Typography variant="h3">1229</Typography>
        </Box>
      </Card>
    </>
  );
};

export default CardDashboard;
