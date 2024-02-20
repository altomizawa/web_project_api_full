import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const[nameError, setNameError] = useState('');
  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    validateFields();
  }, [name, link])

  const validateFields = () => {
    setNameError('');
    setLinkError('');

    if (name.length > 0 && name.length < 3) {
      setNameError('O nome deve ter pelo menos 3 caracteres')
    }

    if (link.length > 0 && link.length < 5) {
      setLinkError('O link deve ter pelo menos 5 caracteres')
    }

    //control Button state using isFormValid boolean
    if (name.length > 3 && link.length >5) { 
      setIsFormValid(true)
    } else {setIsFormValid(false)}
  };

  function handleSubmit(event) {
    event.preventDefault();
    //check if link input is URL
    const https = 'https://';
    link.startsWith(https)
      ? props.onAddPlaceSubmit({cardName: name, cardLink: link})
      : props.onClose();

      //Reset form value
      setName('');
      setLink('');

      //Make Submit Button inactive
      setIsFormValid(false)
  }

  return (
    <PopupWithForm
      title="Novo local"
      name="newcard"
      buttonLabel="Criar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <input
        id="profile-name-input"
        name="cardName"
        type="text"
        value={name}
        className="popup__input popup__input_profile-name"
        placeholder='Título'
        required
        onChange={(e)=>{setName(e.target.value)}}
      />
      {nameError && <p style={{color: 'red', fontSize: '1rem'}}>{nameError}</p>}

      <input
        id="profile-link-input"
        name="cardLink"
        type="url"
        value={link}
        className="popup__input popup__input_profile-link"
        placeholder='Link da Imagem'
        required
        onChange={(e)=>{setLink(e.target.value)}}
      />

      {linkError && <p style={{color: 'red', fontSize: '1rem'}}>{linkError}</p>}

      <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
