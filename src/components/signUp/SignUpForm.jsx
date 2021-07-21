import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { FiArrowLeft } from 'react-icons/fi';
import logo1 from "~/assets/images/heroes.png";
import "./SignUpForm.scss";
// import "./styles.css";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { ToastContainer } from "react-toastify";
import Utils from "~/helpers/Utils";
import { Formik, Form } from "formik";
import RegisterInputText from "~/components/common/registerInputs/RegisterInputText";
import RegisterSelect from "~/components/common/registerInputs/RegisterSelect";
import { useDispatch, useSelector } from "react-redux";
import loginAction from "~/actions/loginAction";
export default function SignUpForm(props) {
  const dispatch = useDispatch();
  const accountCreateSuccess = useSelector(
    (state) => state?.login?.accountCreateSuccess
  );

  const loginCreateLoading = useSelector(
    (state) => state?.app?.loading?.loginCreateLoading
  );
  // const { userData } = useSelector((state) => state.login);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [whatsapp, setWhatsapp] = useState("");
  // const [city, setCity] = useState("");
  // const [uf, setUf] = useState("");
  // const history = useHistory();
  // "email": "denisonoliveiraass@gmail.com",
  // "pass": "e10adc3949ba59abbe56e057f20f883e",
  // "name": "denisonoliveiraaa",
  // "genre": "M",
  // "plan_id":1,
  // "profile_id":1,
  // "clinic_id":1
  let user = {
    name: "",
    email: "",
    pass: "",
    genre: "",
    // profile_id: "",
    // plan_id: "",
    // clinic_id: "",
  };
  // async function handleRegister(e) {
  //     e.preventDefault();

  //     const data = {
  //         name,
  //         email,
  //         whatsapp,
  //         city,
  //         uf,
  //     };

  //     try {
  //         const response = await api.post('ongs', data);

  //         alert(`Seu ID de acesso é: ${response.data.id}`);

  //         history.push('/');
  //     } catch (err) {
  //         alert('Ocorreu um erro, tente novamente mais tarde');
  //     }

  // }

  useEffect(() => {
    if (accountCreateSuccess) {
      setTimeout(function () {
        props.comeback();
      }, 5000);
    }
  }, [accountCreateSuccess, props]);

  return (
    <div className="signUp">
      <div className="register-container">
        <div className="content">
          <section>
            <img className="logoImg" src={logo1} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>Efetue seu cadastro, entre na plataforma</p>

            <Link className="back-link" to="/">
              {/* <FiArrowLeft size={16} color="#E02041" /> */}
              Já possuo cadastro
            </Link>
          </section>
          <ToastContainer />

          <Formik
            initialValues={{ ...user }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "E-mail Obrigatório";
              } else if (!Utils.isValidEmail(values.email)) {
                errors.email = "E-mail inválido";
              }

              if (!values.name) {
                errors.name = "Nome Obrigatório";
              }
              if (!values.pass) {
                errors.pass = "Senha Obrigatória";
              }
              // if (!values.profile_id) {
              //   errors.profile_id = "Tipo de perfil Obrigatória";
              // }
              // if (!values.clinic_id) {
              //   errors.clinic_id = "Clínica Obrigatória";
              // }
              // if (!values.plan_id) {
              //   errors.plan_id = "Plano Obrigatório";
              // }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                loginAction.createAccount(
                  values,
                  "loginCreateLoading",
                  (error) => {
                    setSubmitting(false);
                    if (error) {
                      Utils.showError(error);
                      return;
                    }
                    // console.log("ENTROU NO CALLBACK");
                    Utils.showToast({
                      type: "success",
                      description:
                        "Usuário cadastrado com sucesso, e-mail de ativação enviado ao login cadastrado!",
                    });
                  }
                )
              );
            }}
            render={({ submitForm, setFieldValue }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <RegisterInputText label={"Nome"} name="name" />
                    </Grid>
                    <Grid item xs={6}>
                      <RegisterInputText label={"Senha"} name="pass" type="password" />
                    </Grid>
                    <Grid item xs={8}>
                      <RegisterInputText label={"E-mail"} name="email" />
                    </Grid>
                    <Grid item xs={4}>
                      <RegisterInputText label={"Gênero"} name="genre" />
                    </Grid>
                    {/* <Grid item xs={4}>
                      <RegisterInputText label={"Plano"} name="plan_id" />
                    </Grid>
                    <Grid item xs={4}>
                      <RegisterInputText label={"Clínica"} name="clinic_id" />
                    </Grid>

                    <Grid item xs={4}>
                      <RegisterSelect
                        label={"Perfil"}
                        name="profile_id"
                        options={[
                          "Administrador",
                          "Dentista",
                          "Atendente",
                          "Cliente",
                        ]}
                      />
                    </Grid> */}
                  </Grid>

                  <Button
                    id="speeding-filter-period-save-button"
                    className="report-save-button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disableElevation
                    disabled={loginCreateLoading}
                    onClick={submitForm}
                  >
                    {loginCreateLoading ? (
                      <CircularProgress
                        style={{ height: 14, width: 14, marginRight: 8 }}
                        color={"#fff"}
                      />
                    ) : (
                      <SaveIcon />
                    )}
                    Cadastrar
                  </Button>
                </Form>
              );
            }}
          />
          {/* <form>
            <input
              placeholder="Nome da ONG"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />

            <div className="input-group">
              <input
                placeholder="Cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                placeholder="UF"
                style={{ width: 80 }}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </div>

            <button className="buttonLogin" type="submit">
              Cadastrar
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}
