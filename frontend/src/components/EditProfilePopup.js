import React, {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [about, setAbout] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  //FETCH INITIAL USER DATA TO PROFILE POPUP
  useEffect(() => {
    setName('');
    setAbout('');
  }, [currentUser, setName, setAbout]);

  //VALIDATE FIELDS WHENEVER NAME OR ABOUT CHANGES
  useEffect(() => {
    validateFields();
  }, [name, about])
  
  //validate fields function
  const validateFields = () => {
    setNameError('');
    setAboutError('');

    if (name.length>0 && name.length < 3) {
      setNameError('O nome deve ter pelo menos 3 caracteres')
    }

    if (about.length>0 && about.length <5) {
      setAboutError('A descrição deve ter pelo menos 5 caracteres')
    }
    if (name.length > 2 && about.length > 4) {
      setIsFormValid(true)
    } else {setIsFormValid(false)}
  };

  function handleSubmit(e) {
    //prevent default submit action
    e.preventDefault();
    
    //update profile
    props.onUpdateUser({name, about});

    //finally, disable button
    setIsFormValid(false)
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit"
      buttonLabel="Alterar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={isFormValid}
    >
      <input
        id="profile-name-input"
        name="name"
        type="text"
        className="popup__input popup__input_profile-name"
        placeholder='Jacques Cousteau'
        required
        onChange={(e)=>{setName(e.target.value)}}
      />
      {nameError && <p style={{color: 'red', fontSize: '1rem'}}>{nameError}</p>}

      <input
        id="profile-profession-input"
        name="about"
        type="text"
        className="popup__input popup__input_profile-profession"
        placeholder='Explorador'
        required
        onChange={(e)=>{setAbout(e.target.value)}}
      />
        {aboutError && <p style={{color: 'red', fontSize: '1rem'}}>{aboutError}</p>}

      <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
