import React, {useState, useEffect}from 'react';
import newApi from '../utils/api';

import PencilButton from '../images/Pencil.svg';
import AddButton from '../images/Plus-sign.svg';
import Card from './Card';

import EditAvatar from './EditAvatar';
import EditProfile from './EditProfile';
import AddPlace from './AddPlace';
import BigImagePopup from './BigImagePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  // ------------------Set Cards Array-------------------------
  const [cards, setCards] = useState([]);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false)
  const [isBigImageOpen, setIsBigImageOpen] = useState(false);
  const [bigImageData, setBigImageData]= useState({name: '', link: ''})
  const [currentUser, setCurrentUser] = useState({});

  const authorization = localStorage.getItem('token')

  //Fetch all Cards and set Them
  useEffect(() => {
    newApi.getCardArray().then((cards) => {
      setCards(cards);
    });
  }, []);

  //------------------Set User Data-------------------------
  useEffect(() => {
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
      setIsBigImageOpen={setIsBigImageOpen}
      isBigImageOpen={isBigImageOpen}
      setBigImageData={setBigImageData}
      handleCardDelete={handleCardDelete}
      onCardLike={handleCardLike}
    />
  ));


  // ------------------Update Avatar Function-------------------------
  const handleAvatarSubmit = (avatar) => {
    newApi.updateProfilePicture(avatar, currentUser).then((avatar) => {
      setCurrentUser(avatar);
    });
  };

  // ------------------Update Profile Function-------------------------
  const handleUpdateUser = (user) => {
    newApi.updateProfile(user, currentUser).then((user) => {
      setCurrentUser(user);
    });
  };

  // ------------------Create Card Function-------------------------
  function handleNewCardSubmit(card) {
    newApi
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <main>
        {isAvatarPopupOpen && <EditAvatar setIsAvatarPopupOpen={setIsAvatarPopupOpen} onUpdateAvatar={handleAvatarSubmit} />}
        {isProfilePopupOpen && <EditProfile setIsProfilePopupOpen={setIsProfilePopupOpen} onUpdateUser={handleUpdateUser} />}
        {isAddPlaceOpen && <AddPlace setIsAddPlaceOpen={setIsAddPlaceOpen} onAddPlaceSubmit={handleNewCardSubmit} />}
        {isBigImageOpen && <BigImagePopup name={bigImageData.name} link={bigImageData.link} setIsBigImageOpen={setIsBigImageOpen} />}
        {/* <!-- ------------------------PROFILE INFO------------------------------ --> */}
        <div className="profile">
          <div className="profile__info">
            <div
              className="profile__picture-wrapper"
              onClick={()=>{setIsAvatarPopupOpen(true)}}
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
                  onClick={() => {setIsProfilePopupOpen(true)}}
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
          <button className="adicionar-button" onClick={()=>{
            setIsAddPlaceOpen(true)}}>
            <img
              src={AddButton}
              alt="sinal de mais para adicionar imagem"
              className="adicionar-button__image"
            />
          </button>
        </div>
        {/* -- ------------------------RENDER CARD LIST------------------------------ --> */}{' '}
        <ul className="cards">{cardsData}</ul>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default Main;
