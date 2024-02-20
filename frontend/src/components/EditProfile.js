import React, {useState, useEffect, useContext, useRef} from "react";
import CloseIcon from '../images/Close_Icon.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfile(props){
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [about, setAbout] = useState('');
    const [aboutError, setAboutError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const modalRef = useRef(null);
  
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
  
      //disable button
      setIsFormValid(false)

      //finally, close popup
      props.setIsProfilePopupOpen(false)
    }

    return (
        <div className="edit-avatar"
            ref={modalRef}
            onClick = {(e) => {
            if(e.target === modalRef.current) {props.setIsProfilePopupOpen(false)}} }
        >

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
          onClick={()=>{props.setIsProfilePopupOpen(false)}}
        />
        <h4 className="popup__title">Alterar foto do perfil</h4>
       
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