import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    //check if link input is URL
    const https = 'https://';
    formData.cardLink.startsWith(https)
      ? props.onAddPlaceSubmit(formData)
      : props.onClose();

      //Reset form value
      setFormData({
        cardName: '',
        cardLink: '',
      });

      //Make Submit Button inactive
      const button =e.target.querySelector('button')
      button.classList.add('popup__submit-button_inactive')
  }

  const [formData, setFormData] = React.useState({
    cardName: '',
    cardLink: '',
  });


  function handleInputChange(evt) {
    //Validate Form
    const button = evt.target.parentElement.querySelector('button');
    const isInputValid = evt.target.value.length > 3;
    isInputValid
      ? button.classList.remove('popup__submit-button_inactive')
      : button.classList.add('popup__submit-button_inactive');

    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <PopupWithForm
      title="Novo local"
      name="newcard"
      buttonLabel="Criar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        name="cardName"
        type="text"
        value={formData.cardName}
        className="popup__input popup__input_profile-name"
        placeholder='Título'
        required
        onChange={handleInputChange}
      />

      <input
        id="profile-link-input"
        name="cardLink"
        type="url"
        value={formData.cardLink}
        className="popup__input popup__input_profile-link"
        placeholder='Link da Imagem'
        required
        onChange={handleInputChange}
      />

      <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
