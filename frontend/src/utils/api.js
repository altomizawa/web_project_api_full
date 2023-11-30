import {
  BASE_URL,
} from '../components/constants';

class Api {
  constructor(url = BASE_URL) {
    this._url = url;
  }

 
  getUser() {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfile(userInfo, currentUser) {
    return fetch(`${BASE_URL}/users/${currentUser._id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userInfo.name}`,
        about: `${userInfo.about}`,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }


  updateProfilePicture(avatar, currentUser) {
    return fetch(`${BASE_URL}/users/${currentUser._id}/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: `${avatar}`,
      }),
    })
      .then((res) => res.json())
      .then((avatar) => {
        return avatar;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardArray() {
    return fetch(`${BASE_URL}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // include credentials in the request
    })
      .then((res) => res.json())
      .then((cards) => {
        return cards;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(card) {
    return fetch(`${BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.cardName,
        link: card.cardLink,
      }),
    }).catch((err) => {
      console.log(err);
    });
  }

  removeCard(cardId) {
    return fetch(`${BASE_URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(newCard => newCard)
      .catch((err) => {
        console.log(err);
      });
  }
}

const newApi = new Api();
export default newApi;
