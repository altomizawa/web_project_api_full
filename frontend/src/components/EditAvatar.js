import React, {useState, useEffect, useRef} from "react";
import CloseIcon from '../images/Close_Icon.svg'

export default function EditAvatar(props){
    const avatarRef = React.useRef();

    const [avatar, setAvatar] = useState('');
    const[avatarError, setAvatarError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const modalRef = useRef(null);
  
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
        : props.setIsAvatarPopupOpen()
  
        //Reset form value
        setAvatar('');
  
        //Make Submit Button inactive
        setIsFormValid(false)

        //Close Popup
        props.setIsAvatarPopupOpen(false)
    }
    return (
    <div className="edit-avatar"
        ref={modalRef}
        onClick = {(e) => {
            if(e.target === modalRef.current) {props.setIsAvatarPopupOpen(false)}} }>

      <form
        className="popup__card"
        autoComplete="off"
        noValidate
        name='name'
        onSubmit={handleSubmit}
      >
        <img
          src={CloseIcon}
          alt="ícone X de fechar a janela"
          className="popup__close-button"
          onClick={()=>{props.setIsAvatarPopupOpen(false)}}
        />
        <h4 className="popup__title">Alterar foto do perfil</h4>
       
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
       <button
          className={`popup__submit-button ${!isFormValid ? 'popup__submit-button_inactive' : ''}`}
          type="submit"
        >
          Alterar
        </button>
      </form>
    </div>
    )
}