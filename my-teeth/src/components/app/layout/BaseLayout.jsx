import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";

import Dropdown from "~/components/common/dropdown/Dropdown";
import Item from "~/components/common/dropdown/Item";
import ButtonStyled from "~/components/common/button/ButtonStyled";
import NotificationsIcon from "@material-ui/icons/Notifications";

import HelpOutline from "@material-ui/icons/HelpOutline";
import logo2 from "~/assets/images/tpcLogo3.jpg";
import Menu from "~/components/app/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "~/actions/loginAction";
import "./Layout.scss";
import Utils from "~/helpers/Utils";
const anonymousTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#6AE5FF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fff",
      contrastText: "#13245A",
    },
    error: {
      main: "#90caf9",
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"],
  },
});

const AuthenticatedLayout = (props) => {
  const dispatch = useDispatch();

  const userDataProfile = useSelector((state) => state.user?.userDataProfile);
  const [imageUser, setImage] = useState("");
  const dataUserLoading = useSelector(
    (state) => state.app?.loading?.dataUserLoading
  );

  const autheticatedTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#90caf9",
        contrastText: "#fff",
      },
      secondary: {
        main: "#90caf9",
        contrastText: "#fff",
      },
    },
    typography: {
      fontFamily: ["Trebuchet MS", "sans-serif"],
      fontSize: 10,
    },
  });

  useEffect(() => {
    if (userDataProfile?.picture) {
      // let file = Utils.ab2str(userDataProfile?.picture?.data);
      let file = `data:image/png;base64, ${Utils._arrayBufferToBase64(userDataProfile?.picture?.data)}`;
      setImage(file);
    }
  }, [userDataProfile]);

  const logout = () => {
    dispatch(loginAction.logoutUser());
  };

  return (
    <ThemeProvider theme={autheticatedTheme}>
      <Box className="ceabs-layout">
        <Box className="ceabs-header">
          <Toolbar>
            {/* <div className="icon-menu-list">
              <ListIcon onClick={handleToogleToolbar} />
            </div> */}

            <div className="icon-menu-logo">
              <img className="logoImg" src={logo2} alt={"ceabs"} />
            </div>

            <aside>
              <div id="info-user-main" className="user-profile">
                <div id="info-help" className="help">
                  <HelpOutline style={{ color: "#3D5564" }} />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  //   onClick={handleOpenCommunicate}
                  id="info-notification"
                  className="notification"
                >
                  {/* <Badge color="primary" variant="dot" invisible={flagNotice}> */}
                  <NotificationsIcon
                    style={{
                      color: "#3D5564",
                      height: "13px",
                      borderRadius: "inherit",
                    }}
                  />
                  {/* </Badge> */}
                </div>
                <div id="info-user" className="action-info">
                  <Typography id="info-name" className="username">
                    {dataUserLoading ? (
                      <CircularProgress
                        style={{ height: 14, width: 14, marginRight: 8 }}
                        color={"#fff"}
                      />
                    ) : (
                      userDataProfile?.name
                    )}
                  </Typography>
                  <Dropdown>
                    <Item>
                      <ButtonStyled onClick={() => logout()}>
                        <Typography>Logout</Typography>
                      </ButtonStyled>
                    </Item>
                  </Dropdown>
                </div>
                <Avatar src={imageUser} />
              </div>
            </aside>
          </Toolbar>
          {/* {Object.values(loading).some((x) => x) && <LinearProgress />} */}
        </Box>
        <Box className="ceabs-main">
          <Box
            className="ceabs-menu"
            style={{
              background: " #3d5564",
            }}
          >
            <Menu />
          </Box>
        </Box>
        <Box className="ceabs-content">
          <Container maxWidth={false}>{props.children} </Container>
        </Box>
      </Box>

      {/* <ToastContainer /> */}
    </ThemeProvider>
  );
};

const AnonymousLayout = (props) => {
  // const { loading } = useSelector((state) => state.app);

  return (
    <ThemeProvider theme={anonymousTheme}>
      {/* {loading.header && <LinearProgress />} */}
      <Box>{props.children}</Box>
      {/* <ToastContainer /> */}
    </ThemeProvider>
  );
};

const baseLayout = {
  AuthenticatedLayout,
  AnonymousLayout,
};
export default baseLayout;
