import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { FiArrowLeft } from 'react-icons/fi';
import logo1 from "~/assets/images/heroes.png";
import "./SignUpForm.scss";
// import "./styles.css";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

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

  return (
    <div className="signUp">
      <div className="register-container">
        <div className="content">
          <section>
            <img className="logoImg" src={logo1} alt="Be The Hero" />

            <h1>Cadastro</h1>
            <p>
              Efetue seu cadastro, entre na plataforma e ajude pessoas a
              encontrarem os casos da sua ONG
            </p>

            <Link className="back-link" to="/">
              {/* <FiArrowLeft size={16} color="#E02041" /> */}
              Já possuo cadastro
            </Link>
          </section>
          <form>
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
          </form>
        </div>
      </div>
    </div>
  );
}
