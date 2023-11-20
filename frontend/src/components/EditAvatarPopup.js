import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
  const avatarRef = React.useRef();

  const [formData, setFormData] = React.useState({
    name: '',
    about: '',
    avatar: '',
  });

  function handleInputChange(evt) {
    //Validate Form
    const button = evt.target.parentElement.querySelector('button');
    const isInputValid = evt.target.value.length > 7;
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
    props.onUpdateAvatar(avatarRef.current.value);
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      title="Alterar foto do perfil"
      name="edit_avatar"
      buttonLabel="Alterar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id="profile-link-input"
        name="avatar"
        type="url"
        className="popup__input popup__input_profile-link"
        placeholder="Link da imagem"
        required
        onChange={handleInputChange}
        ref={avatarRef}
      />
      <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
