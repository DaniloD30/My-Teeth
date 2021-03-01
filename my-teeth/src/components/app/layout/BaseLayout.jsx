import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Box, Container, Toolbar, Typography } from "@material-ui/core";

import Dropdown from "~/components/common/dropdown/Dropdown";
import Item from "~/components/common/dropdown/Item";
import ButtonStyled from "~/components/common/button/ButtonStyled";
import NotificationsIcon from "@material-ui/icons/Notifications";

import HelpOutline from "@material-ui/icons/HelpOutline";
import logo2 from "~/assets/images/tpcLogo3.jpg";
import Menu from "~/components/app/menu/Menu";
import { /* useDispatch, */ useSelector } from "react-redux";
// import loginAction from "~/actions/loginAction"
import "./Layout.scss";

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
  // const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.login);

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

  const logout = () => {
    // dispatch(loginAction.logout());
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
                    {userData?.account?.name}
                  </Typography>
                  <Dropdown>
                    <Item>
                      <ButtonStyled onClick={() => logout()}>
                        <Typography>Logout</Typography>
                      </ButtonStyled>
                    </Item>
                  </Dropdown>
                </div>
                <img
                  src={"https://image.flaticon.com/icons/svg/145/145867.svg"}
                  alt={"user"}
                />
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
