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
import Utils from "~/helpers/Utils";
import HelpOutline from "@material-ui/icons/HelpOutline";
// import logo2 from "~/assets/images/tpcLogo3.jpg";
import myteeth01 from "~/assets/images/Myteeth01.png";
import myteeth02 from "~/assets/images/Myteeth02.png";
import Menu from "~/components/app/menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "~/actions/loginAction";
import "./Layout.scss";
import { ToastContainer } from "react-toastify";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router";
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
  let history = useHistory();
  const dataUserLoading = useSelector(
    (state) => state.app?.loading?.dataUserLoading
  );
  const autheticatedTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#29ABE2",
        contrastText: "#fff",
      },
      secondary: {
        main: "#29ABE2",
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
      let file = `data:image/png;base64, ${Utils._arrayBufferToBase64(
        userDataProfile?.picture?.data
      )}`;
      setImage(file);
    }
  }, [userDataProfile]);

  const logout = () => {
    dispatch(loginAction.logoutUser());
  };

  const profile = () => {
    history.push("/profile");
    // history.push("/register/clinicInsert");
  };


  // O token expira em 6 horas
  // setTimeout(function expireToken() {
  //   console.log("Deslogou")
  //   dispatch(loginAction.logoutUser());
  //   clearTimeout();
  // }, 60000);
  //21600000 6h
  // setTimeout(function expireTokenAlert() {
  //   console.log("Aviso para deslogar")
  //   Utils.showError("Relogue no sistema para reativar o token!");
  //   clearTimeout();
  // }, 30000 ); 60000
  //18000000 5h

  const handlerOnCompleteCountdown = () => {
    dispatch(loginAction.logoutUser());
  };

  const handlerOnCompleteCountdownAlert = () => {
    Utils.showError("Relogue no sistema para reativar o token!");
  };

  const comeBack = () => {
    history.push("/home")
    
  };

  return (
    <ThemeProvider theme={autheticatedTheme}>
      <ToastContainer />
      <Box className="ceabs-layout">
        <Box className="ceabs-header">
          <Toolbar>
            <div style={{ display: "none" }}>
              <Countdown
                // key={keyInterval}
                date={Date.now() + 21600000}
                intervalDelay={0}
                precision={3}
                onComplete={handlerOnCompleteCountdown}
              />
              <Countdown
                // key={keyInterval}
                date={Date.now() + 18000000}
                intervalDelay={0}
                precision={3}
                onComplete={handlerOnCompleteCountdownAlert}
              />
            </div>

            <div className="icon-menu-list">
              {/* <ListIcon onClick={handleToogleToolbar} />
               */}
              {/* <Typography variant="h3">Nome da clínica</Typography> */}
              <img
                className="logoImg"
                onClick={() => comeBack()}
                src={myteeth02}
                alt={"ceabs1"}
                width={110}
                height={70}
              />
            </div>

            <div className="icon-menu-logo">
              <img className="logoImg" onClick={() => comeBack()} src={myteeth01} alt={"ceabs"} />
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
                    <ButtonStyled onClick={() => profile()}>
                        <Typography>Dados pessoais</Typography>
                      </ButtonStyled>
                      <ButtonStyled onClick={() => logout()}>
                        <Typography>Sair</Typography>
                      </ButtonStyled>
                    </Item>
                  </Dropdown>
                </div>
                <Avatar style={{width: "45px", height: "45px"}} src={imageUser} />
              </div>
            </aside>
          </Toolbar>
          {/* {Object.values(loading).some((x) => x) && <LinearProgress />} */}
        </Box>
        <Box className="ceabs-main">
          <Box
            className="ceabs-menu"
            // style={{
            //   background: " #3d5564",
            // background:
            //  linear-gradient(
            //   45deg
            //    ,#cccccc,#2e3192,#29abe2, transparent);
            //   }
            // }}
            style={{
              background:
                "linear-gradient(231deg,#cccccc,#2e3192,#29abe2, transparent)",
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
// export default ;
export default withRouter(baseLayout);