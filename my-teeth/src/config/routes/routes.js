import React from "react";
// import Labels from "~/helpers/enums/Labels";

// Views

import Login from "~/views/login/Login";
import SignUp from "~/views/signUp/SignUp";
import Home from "~/views/home/Home";
import Scheduler from "~/views/scheduler/Scheduler";
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

import Patient from "~/assets/icons/patient.svg";
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';
import ApartmentIcon from '@material-ui/icons/Apartment';
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
// import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import DescriptionIcon from "@material-ui/icons/Description";
// import DashboardView from "~/views/dashboard/DashboardView";

// import Dashboard from "~/assets/icons/menuSide/dashboard.svg";
import { subRoutesUsers } from "./subRoutes";
import Profile from "~/views/profile/Profile";
import NotFound from "../../views/notFound/NotFound";
import MyClinic from "../../views/myClinic/MyClinic";
import RegisteredClinicType from "../../views/clinicType/finder/RegisteredClinicType";
import RegisterClinicType from "../../views/clinicType/register/RegisterClinicType";
import RegisteredAppointmentType from "../../views/appointmentsType/finder/RegisteredAppointmentType";
import RegisterAppointmentType from "../../views/appointmentsType/register/RegisterAppointmentType";
import RegisteredPacients from "../../views/pacients/finder/RegisteredPacients";
export const routes = [
  {
    path: "/not-found",
    exact: true,
    title: () => "not found",
    view: () => <NotFound />,
    onlyAuthorized: false,
    showOnMenu: false,
  },
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
    iconMaterial:<DashboardIcon fontSize="large" />,
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
    path: "/register/clinicListType",
    exact: true,
    title: () => "Tipo de Clínica",
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisteredClinicType />,
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Clínica" }],
    onlyAuthorized: true,
    showOnMenu: false,
    // subMenu: true,
    // subRoutes: subRoutesUsers,
    // mainPage: false,
  },
  {
    path: "/register/clinicTypeInsert",
    exact: true,
    title: () => "Tipo de Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Clínica" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterClinicType />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/clinicTypeInsert/:Id",
    exact: true,
    title: () => "Tipo de Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Clínica" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterClinicType />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/appointmentsTypeList",
    exact: true,
    title: () => "Tipos de Consulta",
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisteredAppointmentType />,
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Consulta" }],
    onlyAuthorized: true,
    showOnMenu: false,
    // subMenu: true,
    // subRoutes: subRoutesUsers,
    // mainPage: false,
  },
  {
    path: "/register/appointmentsTypeInsert",
    exact: true,
    title: () => "Tipo de Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Consulta" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterAppointmentType />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/register/appointmentsTypeInsert/:Id",
    exact: true,
    title: () => "Tipo de Clínica",
    breadcrumbs: [{ label: "Cadastro" }, { label: "Tipo de Consulta" }],
    // menu: () => "Usuários",
    // iconMaterial: <PersonAddIcon fontSize="large" />,
    view: () => <RegisterAppointmentType />,
    onlyAuthorized: true,
    showOnMenu: false,
    // mainPage: false,
  },
  {
    path: "/pacients/pacientsList",
    exact: true,
    title: () => "Pacientes",
    menu: () => "Pacientes",
    icon: Patient,
    view: () => <RegisteredPacients />,
    breadcrumbs: [{ label: "Pacientes" }, { label: "Lista de Pacientes" }],
    onlyAuthorized: true,
    profilesAuthorized: ["Administrador", "Dentista", "Atendente", "Cliente"],
    showOnMenu: true,
    // subMenu: true,
    // subRoutes: subRoutesUsers,
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
  {
    path: "/scheduler",
    exact: true,
    title: () => "Agenda",
    menu: () => "Agenda",
    iconMaterial: <EventIcon fontSize="large"/>,
    view: () => <Scheduler />,
    onlyAuthorized: true,
    profilesAuthorized: ["Administrador", "Dentista", "Atendente", "Cliente"],
    showOnMenu: true,
    // mainPage: true,
  },
  {
    path: "/myClinic",
    exact: true,
    title: () => "Minha Clínica",
    menu: () => "Minha Clínica",
    iconMaterial: <ApartmentIcon fontSize="large"/>,
    view: () => <MyClinic />,
    onlyAuthorized: true,
    profilesAuthorized: ["Administrador", "Dentista", "Atendente", "Cliente"],
    showOnMenu: true,
    // mainPage: true,
  },
];

export default routes;
