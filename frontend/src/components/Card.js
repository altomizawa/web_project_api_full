import React, { useContext, useEffect, useState } from 'react';

import trashCanActive from '../images/trashCan.svg';
import trashCanInactive from '../images/trashCan_grey.svg';
import heartActive from '../images/heart_active.svg';
import heart from '../images/heart.svg';
import BigImagePopup from './BigImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
  // ---------------Is Card Popup Open-----------------
  

  // ------------------Context-------------------------
  const currentUser = useContext(CurrentUserContext);

  //Check if it's my card
 
  const isThisMyCard = currentUser._id === props.owner;

  //Check if ive liked the 
  const isLiked = props.card.likes.some((likeId) => likeId === currentUser._id);

  //-----------------------Return JSX--------------------
  return (
    <>
      <li className="card" id="">
        <button
          className="card__delete-button"
          style={{ display: isThisMyCard ? 'block' : 'none' }}
          onClick={() => props.handleCardDelete(props._id)}
        >
          <img
            src={trashCanActive}
            alt="ícone de lata de lixo"
            className="card__delete-icon card__delete-icon_active"
          />
          <img
            src={trashCanInactive}
            alt="ícone de lata de lixo"
            className="card__delete-icon card__delete-icon_inactive"
          />
        </button>
        <img
          src={props.link}
          alt={props.name}
          className="card__image"
          onClick={() => {
            props.setIsBigImageOpen(true);
            props.setBigImageData({name: props.name, link: props.link})}}
        />
        <div className="card__description-wrapper">
          <h4 className="card__title">{props.name}</h4>
          <div className="card__like-wrapper">
            <img
              src={isLiked ? heartActive : heart}
              alt="imagem de um coração vazado"
              className={
                isLiked
                  ? 'like-button like-button_active'
                  : 'like-button like-button_inactive'
              }
              id="like_off"
              onClick={() => {
                props.onCardLike(props.card);
              }}
            />
            <p className="card__likes">{props.likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}
