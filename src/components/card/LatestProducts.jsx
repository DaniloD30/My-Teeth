// import { v4 as uuid } from "uuid";
// import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const products = [
  {
    id: 1,
    name: "Dropbox",
    imageUrl: "/assets/images/Myteeth01.png",
    // updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 2,
    name: "Medium Corporation",
    imageUrl: "/assets/images/Myteeth01.png",
    // updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 3,
    name: "Slack",
    imageUrl: "/assets/images/Myteeth01.png",
    // updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: 4,
    name: "Lyft",
    imageUrl: "/assets/images/Myteeth01.png",
    // updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: 5,
    name: "GitHub",
    imageUrl: "/assets/images/Myteeth01.png",
    // updatedAt: moment().subtract(9, 'hours')
  },
];

const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} in total`}
      title="Latest Products"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            // secondary={`Updated ${product.updatedAt.fromNow()}`}
          />
          <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
      //   sx={{
      //     display: "flex",
      //     justifyContent: "flex-end",
      //     p: 2,
      //   }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);

export default LatestProducts;
