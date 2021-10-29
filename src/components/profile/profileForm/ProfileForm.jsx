import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import moment from 'moment';
import {
  Avatar,
  Box,
  // Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Fab,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
// import RegisterImageInput from "../../common/registerInputs/RegisterImageInput";
// import UserIcon from "~/assets/icons/user.svg";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import userAction from "~/actions/userAction";
import Utils from "~/helpers/Utils";
const user = {
  avatar: "~/assets/icons/user.svg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
  input: {
    display: "none",
  },
  boxInputNone: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ProfileForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userDataProfile = useSelector((state) => state.user?.userDataProfile);
  const userDataAddress = useSelector((state) => state.user?.address);
  // const userDataProfile = useSelector((state) => state.user?.userDataProfile);
  const [img, setImage] = useState(null);
  // const [imgResult, setImageResult] = useState("");

  const savePhoto = (d) => {
    setImage(d);
    const data = d.split(",")[1];
    var raw = window.atob(data);
    var rawlenght = raw?.length;
    var array = new Uint8Array(new ArrayBuffer(rawlenght));
    for (var i = 0; i < rawlenght; i++) {
      array[i] = raw.charCodeAt(i);
    }
    var image = [];
    for (let y = 0; y < rawlenght; y++) {
      image.push(array[y]);
    }
    // let img = `data:image/png;base64, ${userDataProfile?.picture}`;
    // setImage(d);
    // console.log("save ->", d)

    dispatch(userAction.savePhoto(image));
  };

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      // O arquivo de texto será impresso aqui
      // setImageResult()

      savePhoto(event.target.result);
      // console.log(event.target.result)
    };

    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    }

    // }.bind(this);
    // console.log(url); // Would see a path?

    /* dispatach que vai salvar a foto da sote */
    // console.log("file ii->", file)
    // setImage(URL.createObjectURL(file));
    // console.log("File ->", file)
    // this.setState({
    //   mainState: "uploaded",
    //   selectedFile: event.target.files[0],
    //   imageUploaded: 1
    // });
  };

  useEffect(() => {
    if (userDataProfile?.picture?.data) {
      // console.log("data mysql ->", Utils._arrayBufferToBase64(userDataProfile?.picture?.data))

      let img = `data:image/png;base64, ${Utils._arrayBufferToBase64(
        userDataProfile?.picture?.data
      )}`;
      // console.log("img ->", img)
      setImage(img);
    }
  }, [userDataProfile]);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={img} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userDataProfile?.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${userDataAddress?.district ? userDataAddress?.district : ''}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions className={classes.boxInputNone}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span">
            <AddPhotoAlternateIcon />
          </Fab>
          {/* <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button> */}
        </label>
      </CardActions>
    </Card>
  );
};

// Profile.propTypes = {
//   className: PropTypes.string
// };

export default ProfileForm;
