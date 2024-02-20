import React, {useState, useEffect, useRef} from "react";
import CloseIcon from '../images/Close_Icon.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function AddPlace(props){
    const [name, setName] = useState('');
    const[nameError, setNameError] = useState('');
    const [link, setLink] = useState('');
    const [linkError, setLinkError] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);

    const modalRef = useRef(null);
  
  
    //VALIDATE FIELDS WHENEVER NAME OR ABOUT CHANGES
    useEffect(() => {
      validateFields();
    }, [name, link])
    
    //validate fields function
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
        : props.setIsAddPlaceOpen(false)

        //Reset form value
        setName('');
        setLink('');

        //Make Submit Button inactive
        setIsFormValid(false)

        //close popup
        props.setIsAddPlaceOpen(false)
    }

    return (
        <div className="edit-avatar"
            ref={modalRef}
            onClick = {(e) => {
            if(e.target === modalRef.current) {props.setIsAddPlaceOpen(false)}} }
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
          onClick={()=>{props.setIsAddPlaceOpen(false)}}
        />
        <h4 className="popup__title">Adicionar foto</h4>
       
        <input
        id="profile-name-input"
        name="name"
        type="text"
        className="popup__input popup__input_profile-name"
        placeholder='Título'
        required
        onChange={(e)=>{setName(e.target.value)}}
      />
      {nameError && <p style={{color: 'red', fontSize: '1rem'}}>{nameError}</p>}

      <input
        id="profile-link-input"
        name="imagem"
        type="url"
        className="popup__input popup__input_profile-link"
        placeholder="Link da imagem"
        required
        value={link}
        onChange={(e)=>{setLink(e.target.value)}}
      />
        {linkError && <p style={{color: 'red', fontSize: '1rem'}}>{linkError}</p>}

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