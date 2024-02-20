import React, {useState, useEffect, useRef} from "react"
import CloseIcon from '../images/Close_Icon.svg'

export default function BigImagePopup(props){
    const imageRef = useRef(null);

    return(
        <div ref={imageRef} className='popupwithimage popupwithimage_active' onClick={(e) => {if(e.target === imageRef.current){props.setIsBigImageOpen(false)}}}>
            <div className="popupwithimage__wrapper">
                <img
                src={CloseIcon}
                alt="ícone X de fechar a janela"
                className="popupwithimage__close-button"
                onClick={()=>{props.setIsBigImageOpen(false)}}
                />
                <img src={props.link} className="popupwithimage__image-big" alt={props.name} />
                <p>{props.name}</p>
            </div>
        </div>
    )
}