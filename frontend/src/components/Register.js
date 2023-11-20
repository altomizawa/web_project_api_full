import React, { useState } from 'react';
import * as auth from '../utils/auth';

import InfoToolTip from './InfoTooltip';

function Register() {
  //------------SET PASSWORD VISIBILITY-------
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
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
    if (
      (formData.password === '') |
      (formData.email === '') |
      (formData.confirmPassword === '')
    ) {
      setRegistrationStatus('error');
      return setIsPopupActive(true);
    } else if (formData.password === formData.confirmPassword) {
      auth
        .register(formData)
        .then((res) => {
          setRegistrationStatus('success');
          setIsPopupActive(true);
        })
        .catch((err) => {
          setRegistrationStatus('error');
          return setIsPopupActive(true);
        });
    } else {
      setRegistrationStatus('error');
      setIsPopupActive(true);
    }
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
          <h1>Cadastre-se</h1>
          <input
            className="register-input"
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
          <input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirme a Senha"
            type={isPasswordVisible ? 'string' : 'password'}
            autoComplete={formData.password}
          ></input>
          <p className="register__show-password" onClick={showPassword}>
            {' '}
            {isPasswordVisible ? 'HIDE PASSWORD' : 'SHOW PASSWORD'}{' '}
          </p>
          <button className="register__button">Inscrever-se</button>
          <p className="register__text">
            Já é um membro? Faça o login <a href="/signin">aqui</a>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
