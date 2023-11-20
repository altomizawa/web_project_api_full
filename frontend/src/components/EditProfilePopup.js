import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  //ADD USER DATA TO PROFILE POPUP
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  const [formData, setFormData] = React.useState({
    name: '',
    about: '',
    avatar: '',
  });

  function handleInputChange(evt) {
    //Validate From
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

  function handleSubmit(e) {
    e.preventDefault();
    const popup = e.target.parentElement;
    const nameValue = e.target.querySelector('[name="name"]').value;
    const aboutValue = e.target.querySelector('[name="about"]').value;
    if ((nameValue === '') | (aboutValue === '')) {
      popup.classList.add('popup__card_error');
      return setTimeout(() => {
        popup.classList.remove('popup__card_error');
      }, 1000);
    }
    props.onUpdateUser(formData);
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit"
      buttonLabel="Alterar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id="profile-name-input"
        name="name"
        type="text"
        className="popup__input popup__input_profile-name"
        placeholder={name}
        required
        onChange={handleInputChange}
      />

      <input
        id="profile-profession-input"
        name="about"
        type="text"
        className="popup__input popup__input_profile-profession"
        placeholder={about}
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
