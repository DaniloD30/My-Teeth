import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import MoneyIcon from "@material-ui/icons/Money";
import MedicationIcon from "@mui/icons-material/Medication";
import { red } from "@material-ui/core/colors";

const CardAnamnese = ({
  name,
  description,
  colorAvatar,
  date,
  clinicName,
  props,
}) => (
  <Card
    style={{ height: "100%", cursor: "pointer" }}
    //  {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        style={{
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Typography color="textPrimary" gutterBottom variant="h4">
            {name}
          </Typography>
          {/* <Typography color="textPrimary" variant="h3">
            {description}
          </Typography> */}
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: colorAvatar,
              height: 56,
              width: 56,
            }}
            // sx={{
            //   backgroundColor: red[600],
            //   height: 56,
            //   width: 56,
            // }}
          >
            <MedicationIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        style={{
          pt: 2,
          // display: "flex",
          alignItems: "center",
        }}
        // sx={{
        //   pt: 2,
        //   display: "flex",
        //   alignItems: "center",
        // }}
      >
        <Typography
          style={{
            color: red[900],
            mr: 1,
          }}
          // sx={{
          //   color: red[900],
          //   mr: 1
          // }}
          variant="h6"
        >
          {clinicName}
        </Typography>
        <Typography
          style={{
            color: red[900],
            mr: 1,
          }}
          // sx={{
          //   color: red[900],
          //   mr: 1
          // }}
          variant="h6"
        >
          {date}
        </Typography>
        {/* <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography> */}
      </Box>
    </CardContent>
  </Card>
);

export default CardAnamnese;
