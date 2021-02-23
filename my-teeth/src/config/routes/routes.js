import React from "react";
// import Labels from "~/helpers/enums/Labels";

// Views

import Login from "~/views/login/Login";
import SignUp from "~/views/signUp/SignUp";
import Home from "../../views/home/Home";
// import Home from "~/views/home/Home";
// import Users from "~/views/users/register/Users";
// import RegisteredUsers from "~/views/users/finder/RegisteredUsers";
// import RegisteredProfile from "~/views/profile/finder/RegisteredProfile";
// import RegisterProfile from "~/views/profile/register/RegisterProfile";
// import Resources from "~/views/resources/Resources";
// import CloneProfile from "~/views/cloneProfile/CloneProfile";

import Dashboard from "~/assets/icons/dashboard.svg";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import DescriptionIcon from "@material-ui/icons/Description";
// import DashboardView from "~/views/dashboard/DashboardView";

// import Dashboard from "~/assets/icons/menuSide/dashboard.svg";
// import { subRoutesUsers } from "./subRoutes";
export const routes = [
  {
    path: "/login",
    exact: true,
    title: () => "Login",
    view: () => <Login />,
    onlyAuthorized: false,
    showOnMenu: false,
  },
  {
    path: "/signUp",
    exact: true,
    title: () => "Sign Up",
    view: () => <SignUp />,
    onlyAuthorized: false,
    showOnMenu: false,
  },
  {
    path: "/home",
    exact: true,
    title: () => "Home",
    menu: () => "Home",
    icon: Dashboard,
    view: () => <Home />,
    onlyAuthorized: true,
    showOnMenu: true,
    mainPage: true,
  },
];

export default routes;
