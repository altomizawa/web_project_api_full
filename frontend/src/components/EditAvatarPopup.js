import React, {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
  const avatarRef = React.useRef();

  const [avatar, setAvatar] = useState('');
  const[avatarError, setAvatarError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateFields();
  }, [avatar])

  const validateFields = () => {
    setAvatarError('');

    if (avatar.length <= 5) {
      if(avatar.length>0) setAvatarError('O link deve ter pelo menos 5 caracteres');
      setIsFormValid(false)
    } else { 
      setAvatarError('');
      setIsFormValid(true);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    //check if link input is URL
    const https = 'https://';
    avatar.startsWith(https)
      ? props.onUpdateAvatar({avatar})
      : props.onClose();

      //Reset form value
      setAvatar('');

      //Make Submit Button inactive
      setIsFormValid(false)
  }

  return (
    <PopupWithForm
      title="Alterar foto do perfil"
      name="edit_avatar"
      buttonLabel="Alterar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isValid={isFormValid}
    >
      <input
        id="profile-link-input"
        name="avatar"
        type="url"
        className="popup__input popup__input_profile-link"
        placeholder="Link da imagem"
        required
        value={avatar}
        onChange={(e)=>{setAvatar(e.target.value)}}
        // ref={avatarRef}
      />
      {avatarError && <p style={{color: 'red', fontSize: '1rem'}}>{avatarError}</p>}
            <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
