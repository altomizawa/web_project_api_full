import React, { useEffect, useState } from 'react';
import * as auth from '../utils/auth';

import InfoToolTip from './InfoTooltip';

function Login(props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPassworderror] = useState('');

  //---------HANDLE POPUP ACTIVE-----------
  const [isPopupActive, setIsPopupActive] = useState(false);

  //---------SET TEXT INSIDE POPUP----------
  const [registrationStatus, setRegistrationStatus] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function showPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  //----------SET FORMDATA----------------

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //---------HANDLE FORM SUBMISSION-----------
  function handleFormSubmit(e) {
    //prevent Default submit action
    e.preventDefault();
    
    //check if fields are empty
    if (!email || !password) {
      setRegistrationStatus('error');
      return setIsPopupActive(true);
    }
    //Check authorization
    auth
      .authorize({email, password})
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token) //store token in localStorage
          props.handleLogin(); //Login
        }
      })
      .catch((err) => {
        setRegistrationStatus('error');
        return setIsPopupActive(true);
      });
  }

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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            value={email}
          ></input>
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
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
