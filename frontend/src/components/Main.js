import React from 'react';
import newApi from '../utils/api';

import PencilButton from '../images/Pencil.svg';
import AddButton from '../images/Plus-sign.svg';
import Card from './Card';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  // ------------------Set Cards Array-------------------------
  const [cards, setCards] = React.useState([]);
  const authorization = localStorage.getItem('token')
  React.useEffect(() => {
    newApi.getCardArray().then((cards) => {
      setCards(cards);
    });
  }, []);

  // ------------------Event Handlers-------------------------

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen((prevState) => !prevState);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen((prevState) => !prevState);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen((prevState) => !prevState);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen((prevState) => !prevState);
  };

  //------------------Set User Data-------------------------
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    newApi.getUser(authorization).then((user) => {
      setCurrentUser(user);
    });
  }, []);
  const { name, about, avatar } = currentUser;
  

  // --------------------MAP CARDS-------------------------
  const cardsData = cards.map((card, i) => (
    <Card
      key={i}
      {...card}
      card={card}
      onCardClick={handleCardClick}
      handleCardDelete={handleCardDelete}
      selectedCard={props.selectedCard}
      onCardLike={handleCardLike}
    />
  ));

  // ------------------Variables-------------------------
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  // ------------------Update Avatar Function-------------------------
  const handleAvatarSubmit = (avatar) => {
    console.log(avatar)
    newApi.updateProfilePicture(avatar, currentUser).then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    });
  };

  // ------------------Update Profile Function-------------------------
  const handleUpdateUser = (user) => {
    newApi.updateProfile(user, currentUser).then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    });
  };

  // ------------------Create Card Function-------------------------
  function handleNewCardSubmit(card) {
    newApi
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //-------------------Delete Card Function-------------------------
  function handleCardDelete(cardId) {
    newApi.removeCard(cardId).then(() => {
      setCards(cards.filter((c) => c._id !== cardId));
    });
  }

  //--------------------HANDLE CARD LIKE FUNCTION---------------
  function handleCardLike(card) {
    //Check if card has been liked
    const isLiked = card.likes.some((cardId) => cardId === currentUser._id);

    //send api request and get updated card
    newApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
    })
  }

  // ------------------Functions-------------------------

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main>
        {/* <!-- ------------------------PROFILE INFO------------------------------ --> */}
        <div className="profile">
          <div className="profile__info">
            <div
              className="profile__picture-wrapper"
              onClick={handleEditAvatarClick}
            >
              <div className="profile__picture-overlay">
                <img
                  src={PencilButton}
                  alt="pencil to edit avatar"
                  className="profile__picture-icon"
                />
              </div>
              <img src={avatar} alt="Avatar" className="profile__picture" />
            </div>
            <div className="profile__text-wrapper">
              <div className="profile__name-wrapper">
                <h1 className="profile__name">{name}</h1>
                <button
                  onClick={handleEditProfileClick}
                  className="profile__edit"
                >
                  <img src={PencilButton} alt="ilustração de um lápis" />
                </button>
              </div>
              <h2 className="profile__title">{about}</h2>
            </div>
          </div>
          {/* -- ------------------------ADD NEW CARD BUTTON------------------------------ --> */}{' '}
          */}
          <button className="adicionar-button" onClick={handleAddPlaceClick}>
            <img
              src={AddButton}
              alt="sinal de mais para adicionar imagem"
              className="adicionar-button__image"
            />
          </button>
        </div>
        {/* -- ------------------------RENDER CARD LIST------------------------------ --> */}{' '}
        <ul className="cards">{cardsData}</ul>
        {/* <!-- ------------------------PROFILE AVATAR FORM------------------------------ --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarSubmit}
        />
        {/* ----------------------------PROFILE FORM-------------------------------- */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* <!-- ------------------------NEW CARD FORM------------------------------ --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleNewCardSubmit}
        />
        {/* ----------------------------IMAGE POPUP-------------------------------- */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isImagePopupOpen={isImagePopupOpen}
        />
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;
