import React from "react";
// import Labels from "~/helpers/enums/Labels";

// Views

import Login from "~/views/login/Login";
import SignUp from "~/views/signUp/SignUp";
import Home from "~/views/home/Home";
// import Home from "~/views/home/Home";
// import Users from "~/views/users/register/Users";
import RegisteredClinic from "~/views/clinic/finder/RegisteredClinic";
import RegisterClinic from "~/views/clinic/register/RegisterClinic";

import RegisteredProcedure from "~/views/procedures/finder/RegisteredProcedure";
import RegisterProcedure from "~/views/procedures/register/RegisterProcedure";
// import RegisteredProfile from "~/views/profile/finder/RegisteredProfile";
// import RegisterProfile from "~/views/profile/register/RegisterProfile";
// import Resources from "~/views/resources/Resources";
// import CloneProfile from "~/views/cloneProfile/CloneProfile";

import Dashboard from "~/assets/icons/dashboard.svg";
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import DescriptionIcon from "@material-ui/icons/Description";
// import DashboardView from "~/views/dashboard/DashboardView";

// import Dashboard from "~/assets/icons/menuSide/dashboard.svg";
import { subRoutesUsers } from "./subRoutes";
import Profile from "~/views/profile/Profile";
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
    profilesAuthorized: ["Administrador", "Dentista", "Atendente", "Cliente"],
    showOnMenu: true,
    mainPage: true,
  },
  {
    pathMenu: "/register",
    exact: true,
    menu: () => "Cadastros",
    iconMaterial: <PostAddIcon fontSize="large" />,
    showOnMenu: true,
    subMenu: true,
    profilesAuthorized: ["Administrador", "Dentista", "Atendente"],
    subRoutes: subRoutesUsers,
  },
  {
    path: "/register/clinicList",
    exact: true,
    title: () => "Clínica",
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisteredClinic />,
    breadcrumbs: [{ label: "Cadastro" }, { label: "Clínica" }],
    onlyAuthorized: true,
    showOnMenu: false,
    // subMenu: true,
    // subRoutes: subRoutesUsers,
    // mainPage: false,
  },
  {
    path: "/register/clinicInsert",
    exact: true,
    title: () => "Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Clínica" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterClinic />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/clinicInsert/:Id",
    exact: true,
    title: () => "Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Clínica" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterClinic />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/procedureList",
    exact: true,
    title: () => "Procedimento",
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisteredProcedure />,
    breadcrumbs: [{ label: "Cadastro" }, { label: "Procedimento" }],
    onlyAuthorized: true,
    showOnMenu: false,
    // subMenu: true,
    // subRoutes: subRoutesUsers,
    // mainPage: false,
  },
  {
    path: "/register/procedureInsert",
    exact: true,
    title: () => "Procedimento",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Procedimento" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterProcedure />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/procedureInsert/:Id",
    exact: true,
    title: () => "Procedimento",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Procedimento" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterProcedure />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/profile",
    exact: true,
    title: () => "Perfil",
    menu: () => "Perfil",
    iconMaterial: <AccountBoxIcon fontSize="large" />,
    view: () => <Profile />,
    onlyAuthorized: true,
    profilesAuthorized: ["Administrador", "Dentista", "Atendente", "Cliente"],
    showOnMenu: true,
  },
];

export default routes;
