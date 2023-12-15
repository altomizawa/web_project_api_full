import React, { useState } from 'react';
import * as auth from '../utils/auth';

import InfoToolTip from './InfoTooltip';

function Login(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function showPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  //----------SET FORMDATA----------------

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  //---------HANDLE FORM INPUT CHANGE-----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //---------HANDLE FORM SUBMISSION-----------
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setRegistrationStatus('error');
      return setIsPopupActive(true);
    }
    auth
      .authorize(formData)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          props.handleLogin();
        }
      })
      .catch((err) => {
        setRegistrationStatus('error');
        return setIsPopupActive(true);
      });
  }

  //---------HANDLE POPUP ACTIVE-----------
  const [isPopupActive, setIsPopupActive] = useState(false);

  //---------SET TEXT INSIDE POPUP----------
  const [registrationStatus, setRegistrationStatus] = useState('');

  return (
    <>
      <InfoToolTip
        isPopupActive={isPopupActive}
        setIsPopupActive={setIsPopupActive}
        registrationStatus={registrationStatus}
      />
      <section className="register">
        <form className="register__form" onSubmit={handleFormSubmit}>
          <h1>Entrar</h1>
          <input
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            type="email"
          ></input>
          <input
            name="password"
            onChange={handleChange}
            placeholder="Senha"
            type={isPasswordVisible ? 'string' : 'password'}
            autoComplete={formData.password}
          ></input>
          <p className="register__show-password" onClick={showPassword}>
            {' '}
            {isPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}{' '}
          </p>
          <button className="register__button">Entrar</button>
          <p className="register__signup">
            Ainda não é membro? Inscreva-se <a href="/signup">aqui</a>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
