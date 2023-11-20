import React from "react";
import CloseButton from "../images/Close_Icon.svg";

function PopupWithForm(props) {
  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(`popup_${props.name}`)) {
      props.onClose();
      removeEventListeners();
    }
  };

  const handleEsc = (evt) => {
    if (evt.key === "Escape") {
      props.onClose();
      removeEventListeners();
    }
  };

  function setEventListeners() {
    window.addEventListener("keydown", handleEsc);
    window.addEventListener("click", handleOverlayClick);
  }

  function removeEventListeners() {
    window.removeEventListener("keydown", handleEsc);
    window.removeEventListener("click", handleOverlayClick);
  }

  setEventListeners();

  return (
    <div
      className={`popup popup_${props.name} ${props.isOpen && "popup_active"}`}
    >
      <form
        className="popup__card"
        autoComplete="off"
        noValidate
        name={props.name}
        onSubmit={props.onSubmit}
      >
        <img
          src={CloseButton}
          alt="ícone X de fechar a janela"
          className="popup__close-button"
          onClick={props.onClose}
        />
        <h4 className="popup__title">{props.title}</h4>
        {props.children}
        <button
          className="popup__submit-button popup__submit-button_inactive"
          type="submit"
        >
          {props.buttonLabel}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
