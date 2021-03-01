import React, {  useState } from "react";
// import { FiLogIn } from 'react-icons/fi';
import { Link } from "react-router-dom";
// import logo2 from "~/assets/images/tpcLogo1.jpg";
import logo1 from "~/assets/images/heroes.png";
// import logo2 from "~/assets/images/tpcLogo3.jpg";
import "./LoginForm.scss";
import loginAction from "~/actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import {  CircularProgress } from "@material-ui/core";
// import heroesImg from '../../assets/heroes.png';
// import logo from '../../assets/logo.svg';
import Utils from "~/helpers/Utils";
export default function Logon() {
  const [dataLogin, setDataLogin] = useState({ values: {} });
  const loginLoading = useSelector((state) => state.app?.loading?.loginLoading);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      loginAction.createLogin(dataLogin?.values, "loginLoading", (error) => {
        if (error) {
          Utils.showError(error);
          return;
        }

        // Redireciona para a tela HOME com as permissões
      })
    );
  };
  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      values: {
        ...dataLogin.values,
        [e.target.name]: e.target.value,
      },
    });
  };
  // useEffect(() => {
  // if (localStorage.getItem("tokenAzure")) {
  //   dispatch(loginAction.addProfiles("loginLoading"));
  // }
  // }, dispatch);

  return (
    <div className="loginRoot">
      {" "}
      <div className="logonContainer">
        <section className="form">
          {/* <img className="logoImg" src={logo2} alt="Be the hero" /> */}
          {/* <form onSubmit={(e) => handleLogin(e)}> */}
          {/* <form> */}
          <h1>Faça o seu login</h1>
          <input
            style={{ marginBottom: "10px" }}
            placeholder="Sua ID"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="Senha"
            type="password"
            name="password"
            onChange={handleChange}
          />

          {loginLoading ? (
            <CircularProgress
              style={{ height: 14, width: 14, marginRight: 8 }}
              color={"#fff"}
            />
          ) : (
            <button
              className="buttonLogin"
              onClick={(e) => handleLogin(e)}
              type="submit"
            >
              Entrar
            </button>
          )}

          <Link className="back-link" to="/signUp">
            {/* <FiLogIn size={16} color="#E02041" /> */}
            Não tenho cadastro
          </Link>
          {/* </form> */}
        </section>
        <img className="heroesImg" src={logo1} alt="Heroes" />
      </div>
    </div>
  );
}
