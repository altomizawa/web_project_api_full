import {
  apiUrl,
  authorization,
  authorization_new,
  apiUrl_new,
} from '../components/constants';

class Api {
  constructor(url = apiUrl, authorizationToken = authorization) {
    this._url = url;
    this._authorization = authorizationToken;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: this._authorization,
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

  updateProfile(userInfo, button) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
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

  updateProfilePicture(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: this._authorization,
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
    return fetch(`${apiUrl_new}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorization_new}`,
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
    return fetch(`${apiUrl_new}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authorization_new}`,
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
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application/json',
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: {
        Authorization: this._authorization,
        'Content-Type': 'application.json',
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
}

const newApi = new Api();
export default newApi;
