import React from 'react'

export default function PopupWithImage(props){
    return(
        <div className="popupwithimage popupwithimage_active">
            <div className="popupwithimage__wrapper">
                <img
                src=" "
                alt="ícone X de fechar a janela"
                className="popupwithimage__close-button"
                />
                <img src="" className="popupwithimage__image-big" alt="" />
                <p>""</p>
            </div>
        </div>
    )
}